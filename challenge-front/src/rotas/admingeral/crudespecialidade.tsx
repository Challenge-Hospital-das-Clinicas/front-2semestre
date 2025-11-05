import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type Especialidade = { id: number; nome: string; };
type EspecialidadeFormData = { nome: string; };
const defaultFormValues: EspecialidadeFormData = { nome: '' };

export default function CrudEspecialidade() {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEspecialidade, setEditingEspecialidade] = useState<Especialidade | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EspecialidadeFormData>({ defaultValues: defaultFormValues });
  const API_URL = 'https://hospitaltech-api-latest.onrender.com/q/swagger-ui/#/';

  const fetchEspecialidades = async () => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`${API_URL}/especialidades`);
      if (!response.ok) throw new Error(`API (GET) retornou erro: ${response.statusText}`);
      const data: Especialidade[] = await response.json();
      setEspecialidades(data);
    } catch (err) {
      console.error("Falha ao buscar especialidades:", err);
      let errorMessage = "Não foi possível carregar a lista de especialidades.";
      if (err instanceof Error) errorMessage = err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEspecialidades(); }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza?")) return;
    try {
      const response = await fetch(`${API_URL}/especialidades/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`Erro da API (DELETE)`);
      alert("Especialidade excluída!");
      fetchEspecialidades(); 
    } catch (err) {
      console.error("Falha ao excluir especialidade:", err);
      let errorMessage = "Erro desconhecido";
      if (err instanceof Error) errorMessage = err.message;
      alert(`Erro ao excluir: ${errorMessage}`);
    }
  };

  const handleEdit = (especialidade: Especialidade) => {
    setEditingEspecialidade(especialidade);
    reset({ nome: especialidade.nome });
  };

  const handleCancelEdit = () => {
    setEditingEspecialidade(null);
    reset(defaultFormValues);
  };

  const onSubmit = async (data: EspecialidadeFormData) => {
    const payload = { id: editingEspecialidade ? editingEspecialidade.id : 0, ...data };
    const isUpdating = !!editingEspecialidade;
    const url = `${API_URL}/especialidades`;
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
      alert(`Especialidade ${isUpdating ? 'atualizada' : 'cadastrada'}!`);
      handleCancelEdit();
      fetchEspecialidades(); 
    } catch (err) {
      console.error(`Falha ao ${method} especialidade:`, err);
      let errorMessage = "Erro desconhecido";
      if (err instanceof Error) errorMessage = err.message;
      alert(`Erro ao salvar: ${errorMessage}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 mb-10 border-b pb-10">
        <h2 className="text-2xl font-semibold text-slate-700">
          {editingEspecialidade ? `Editando: ${editingEspecialidade.nome}` : 'Cadastrar Nova Especialidade'}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nome" className="font-semibold text-slate-700">Nome da Especialidade</label>
            <input type="text" id="nome" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("nome", { required: "O nome é obrigatório" })} />
            {errors.nome && <small className="text-red-500">{errors.nome.message}</small>}
          </div>
          <div className="flex items-end">
            <button type="submit" className={`w-full font-bold py-3 rounded-md ${editingEspecialidade ? 'bg-blue-700' : 'bg-green-700'} text-white`}>
              {editingEspecialidade ? 'Salvar Alterações (PUT)' : 'Salvar (POST)'}
            </button>
            {editingEspecialidade && (
              <button type="button" onClick={handleCancelEdit} className="w-1/2 ml-4 bg-slate-500 text-white font-bold py-3 rounded-md">
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">Especialidades Cadastradas (GET)</h2>
        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="space-y-4">
            {especialidades.length === 0 ? <p>Nenhuma especialidade encontrada.</p> : especialidades.map((espec) => (
              <div key={espec.id} className="flex flex-wrap justify-between items-center p-4 border rounded-lg shadow-sm gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{espec.nome} (ID: {espec.id})</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(espec)} className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                  <button onClick={() => handleDelete(espec.id)} className="bg-red-600 text-white px-3 py-1 rounded">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}