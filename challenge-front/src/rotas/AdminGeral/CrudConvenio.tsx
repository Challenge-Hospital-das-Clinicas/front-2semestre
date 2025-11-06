import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type Convenio = { id: number; nome: string; cobertura: string; };
type ConvenioFormData = { nome: string; cobertura: string; };
const defaultFormValues: ConvenioFormData = { nome: '', cobertura: '' };

export default function CrudConvenio() {
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingConvenio, setEditingConvenio] = useState<Convenio | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ConvenioFormData>({ defaultValues: defaultFormValues });
  const API_URL = '/api';

  const fetchConvenios = async () => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`${API_URL}/convenio`, { headers: { 'Accept': 'application/json' } });
      if (!response.ok) throw new Error(`API (GET) retornou erro: ${response.statusText}`);
      const data: Convenio[] = await response.json();
      setConvenios(data);
    } catch (err) {
      console.error("Falha ao buscar convênios:", err);
      let errorMessage = "Não foi possível carregar a lista de convênios.";
      if (err instanceof Error) errorMessage = err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchConvenios(); }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza?")) return;
    try {
      const response = await fetch(`${API_URL}/convenio/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`Erro da API (DELETE)`);
      alert("Convênio excluído!");
      fetchConvenios(); 
    } catch (err) {
      console.error("Falha ao excluir convênio:", err);
      let errorMessage = "Erro desconhecido";
      if (err instanceof Error) errorMessage = err.message;
      alert(`Erro ao excluir: ${errorMessage}`);
    }
  };

  const handleEdit = (convenio: Convenio) => {
    setEditingConvenio(convenio);
    reset({ nome: convenio.nome, cobertura: convenio.cobertura });
  };

  const handleCancelEdit = () => {
    setEditingConvenio(null);
    reset(defaultFormValues);
  };

  const onSubmit = async (data: ConvenioFormData) => {
    const payload = { id: editingConvenio ? editingConvenio.id : 0, ...data };
    const isUpdating = !!editingConvenio;
    const url = `${API_URL}/convenio`;
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
      alert(`Convênio ${isUpdating ? 'atualizado' : 'cadastrado'}!`);
      handleCancelEdit();
      fetchConvenios(); 
    } catch (err) {
      console.error(`Falha ao ${method} convênio:`, err);
      let errorMessage = "Erro desconhecido";
      if (err instanceof Error) errorMessage = err.message;
      alert(`Erro ao salvar: ${errorMessage}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 mb-10 border-b pb-10">
        <h2 className="text-2xl font-semibold text-slate-700">
          {editingConvenio ? `Editando: ${editingConvenio.nome}` : 'Cadastrar Novo Convênio'}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nome" className="font-semibold text-slate-700">Nome do Convênio</label>
            <input type="text" id="nome" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("nome", { required: "O nome é obrigatório" })} />
            {errors.nome && <small className="text-red-500">{errors.nome.message}</small>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cobertura" className="font-semibold text-slate-700">Tipo de Cobertura</label>
            <input type="text" id="cobertura" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("cobertura", { required: "A cobertura é obrigatória" })} />
            {errors.cobertura && <small className="text-red-500">{errors.cobertura.message}</small>}
          </div>
        </div>
        <div className="flex gap-4">
          <button type="submit" className={`w-full font-bold py-3 rounded-md ${editingConvenio ? 'bg-blue-700' : 'bg-green-700'} text-white`}>
            {editingConvenio ? 'Salvar Alterações' : 'Salvar Novo Convênio'}
          </button>
          {editingConvenio && (
            <button type="button" onClick={handleCancelEdit} className="w-1/3 bg-slate-500 text-white font-bold py-3 rounded-md">
              Cancelar Edição
            </button>
          )}
        </div>
      </form>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">Convênios Cadastrados</h2>
        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="space-y-4">
            {convenios.length === 0 ? <p>Nenhum convênio encontrado.</p> : convenios.map((convenio) => (
              <div key={convenio.id} className="flex flex-wrap justify-between items-center p-4 border rounded-lg shadow-sm gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{convenio.nome}</h3>
                  <p>Cobertura: {convenio.cobertura}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(convenio)} className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                  <button onClick={() => handleDelete(convenio.id)} className="bg-red-600 text-white px-3 py-1 rounded">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}