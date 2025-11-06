import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type MedicoDaLista = { id: number; nome: string; crm: string; especialidades: { id: number; nome: string; }[]; };
type MedicoFormData = { nome: string; crm: string; especialidadeNome: string; };
const defaultFormValues: MedicoFormData = { nome: '', crm: '', especialidadeNome: '' };

export default function CrudMedico() {
  const [medicos, setMedicos] = useState<MedicoDaLista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingDoctor, setEditingDoctor] = useState<MedicoDaLista | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<MedicoFormData>({ defaultValues: defaultFormValues });
  const API_URL = '/api'; 

  const fetchMedicos = async () => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`${API_URL}/medico`, { headers: { 'Accept': 'application/json' } });
      if (!response.ok) throw new Error(`API (GET) retornou erro: ${response.statusText}`);
      const data: MedicoDaLista[] = await response.json();
      setMedicos(data);
    } catch (err) {
      console.error("Falha ao buscar médicos:", err);
      let errorMessage = "Não foi possível carregar a lista de médicos.";
      if (err instanceof Error) errorMessage = err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMedicos(); }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza?")) return;
    try {
      const response = await fetch(`${API_URL}/medico/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`Erro da API (DELETE)`);
      alert("Médico excluído!");
      fetchMedicos(); 
    } catch (err) {
      console.error("Falha ao excluir médico:", err);
      let errorMessage = "Erro desconhecido";
      if (err instanceof Error) errorMessage = err.message;
      alert(`Erro ao excluir: ${errorMessage}`);
    }
  };

  const handleEdit = (medico: MedicoDaLista) => {
    setEditingDoctor(medico);
    reset({
      nome: medico.nome,
      crm: medico.crm,
      especialidadeNome: medico.especialidades[0]?.nome || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingDoctor(null);
    reset(defaultFormValues);
  };

  const onSubmit = async (data: MedicoFormData) => {
    const payload = {
      id: editingDoctor ? editingDoctor.id : 0, 
      nome: data.nome,
      crm: data.crm,
      especialidades: { id: 0, nome: data.especialidadeNome },
      especialidade: { id: 0, nome: data.especialidadeNome }
    };
    const isUpdating = !!editingDoctor;
    const url = `${API_URL}/medico`;
    const method = isUpdating ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'accept': '*/*' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || `Erro da API (${method})`);
      }
      alert(`Médico ${isUpdating ? 'atualizado' : 'cadastrado'}!`);
      handleCancelEdit();
      fetchMedicos(); 
    } catch (err) {
      console.error(`Falha ao ${method} médico:`, err);
      let errorMessage = "Erro desconhecido";
      if (err instanceof Error) errorMessage = err.message;
      alert(`Erro ao salvar: ${errorMessage}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 mb-10 border-b pb-10">
        <h2 className="text-2xl font-semibold text-slate-700">
          {editingDoctor ? `Editando: ${editingDoctor.nome}` : 'Cadastrar Novo Médico'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nome" className="font-semibold text-slate-700">Nome Completo</label>
            <input type="text" id="nome" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("nome", { required: "O nome é obrigatório" })} />
            {errors.nome && <small className="text-red-500">{errors.nome.message}</small>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="crm" className="font-semibold text-slate-700">CRM</label>
            <input type="text" id="crm" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("crm", { required: "O CRM é obrigatório" })} />
            {errors.crm && <small className="text-red-500">{errors.crm.message}</small>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="especialidadeNome" className="font-semibold text-slate-700">Especialidade</label>
            <input type="text" id="especialidadeNome" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("especialidadeNome", { required: "A especialidade é obrigatória" })} />
            {errors.especialidadeNome && <small className="text-red-500">{errors.especialidadeNome.message}</small>}
          </div>
        </div>
        <div className="flex gap-4">
          <button type="submit" className={`w-full font-bold py-3 rounded-md ${editingDoctor ? 'bg-blue-700' : 'bg-green-700'} text-white`}>
            {editingDoctor ? 'Salvar Alterações (PUT)' : 'Salvar Novo Médico (POST)'}
          </button>
          {editingDoctor && (
            <button type="button" onClick={handleCancelEdit} className="w-1/3 bg-slate-500 text-white font-bold py-3 rounded-md">
              Cancelar Edição
            </button>
          )}
        </div>
      </form>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">Médicos Cadastrados (GET)</h2>
        {loading && <p>Carregando lista...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="space-y-4">
            {medicos.length === 0 ? <p>Nenhum médico encontrado.</p> : medicos.map((medico) => (
              <div key={medico.id} className="flex flex-wrap justify-between items-center p-4 border rounded-lg shadow-sm gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{medico.nome}</h3>
                  <p>CRM: {medico.crm}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(medico)} className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                  <button onClick={() => handleDelete(medico.id)} className="bg-red-600 text-white px-3 py-1 rounded">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}