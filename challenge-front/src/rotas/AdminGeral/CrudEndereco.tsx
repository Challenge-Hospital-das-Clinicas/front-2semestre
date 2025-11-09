import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type Endereco = { id: number; rua: string; numero: number; cidade: string; estado: string; cep: string; };
type EnderecoFormData = { rua: string; numero: number; cidade: string; estado: string; cep: string; };
const defaultFormValues: EnderecoFormData = { rua: '', numero: 0, cidade: '', estado: '', cep: '' };

export default function CrudEndereco() {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEndereco, setEditingEndereco] = useState<Endereco | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EnderecoFormData>({ defaultValues: defaultFormValues });
  const API_URL = '/api';

  const fetchEnderecos = async () => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`${API_URL}/endereco`, { headers: { 'Accept': 'application/json' } });
      if (!response.ok) throw new Error(`API (GET) retornou erro: ${response.statusText}`);
      const data: Endereco[] = await response.json();
      setEnderecos(data);
    } catch (err) {
      console.error("Falha ao buscar endereços:", err);
      let errorMessage = "Não foi possível carregar a lista de endereços.";
      if (err instanceof Error) errorMessage = err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEnderecos(); }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza?")) return;
    try {
      const response = await fetch(`${API_URL}/endereco/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`Erro da API (DELETE)`);
      alert("Endereço excluído!");
      fetchEnderecos(); 
    } catch (err) {
      console.error("Falha ao excluir endereço:", err);
      let errorMessage = "Erro desconhecido";
      if (err instanceof Error) errorMessage = err.message;
      alert(`Erro ao excluir: ${errorMessage}`);
    }
  };

  const handleEdit = (endereco: Endereco) => {
    setEditingEndereco(endereco);
    reset(endereco);
  };

  const handleCancelEdit = () => {
    setEditingEndereco(null);
    reset(defaultFormValues);
  };

  const onSubmit = async (data: EnderecoFormData) => {
    const payload = { id: editingEndereco ? editingEndereco.id : 0, ...data, numero: Number(data.numero) };
    const isUpdating = !!editingEndereco;
    const url = `${API_URL}/endereco`;
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
      alert(`Endereço ${isUpdating ? 'atualizado' : 'cadastrado'}!`);
      handleCancelEdit();
      fetchEnderecos(); 
    } catch (err) {
      console.error(`Falha ao ${method} endereço:`, err);
      let errorMessage = "Erro desconhecido";
      if (err instanceof Error) errorMessage = err.message;
      alert(`Erro ao salvar: ${errorMessage}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 mb-10 border-b pb-10">
        <h2 className="text-2xl font-semibold text-slate-700">
          {editingEndereco ? `Editando Endereço #${editingEndereco.id}` : 'Cadastrar Novo Endereço'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="rua" className="font-semibold text-slate-700">Rua</label>
            <input type="text" id="rua" className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("rua", { required: "Rua obrigatória" })} />
            {errors.rua && <small className="text-red-500">{errors.rua.message}</small>}
          </div>
          <div>
            <label htmlFor="numero" className="font-semibold text-slate-700">Número</label>
            <input type="number" id="numero" className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("numero", { required: "Número obrigatório", valueAsNumber: true })} />
            {errors.numero && <small className="text-red-500">{errors.numero.message}</small>}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="cidade" className="font-semibold text-slate-700">Cidade</label>
            <input type="text" id="cidade" className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("cidade", { required: "Cidade obrigatória" })} />
            {errors.cidade && <small className="text-red-500">{errors.cidade.message}</small>}
          </div>
          <div>
            <label htmlFor="estado" className="font-semibold text-slate-700">Estado (UF)</label>
            <input type="text" id="estado" maxLength={2} className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("estado", { required: "Estado obrigatório", maxLength: 2 })} />
            {errors.estado && <small className="text-red-500">{errors.estado.message || 'Máx 2 (ex: SP)'}</small>}
          </div>
          <div>
            <label htmlFor="cep" className="font-semibold text-slate-700">CEP</label>
            <input type="text" id="cep" className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("cep", { required: "CEP obrigatório" })} />
            {errors.cep && <small className="text-red-500">{errors.cep.message}</small>}
          </div>
        </div>
        <div className="flex gap-4">
          <button type="submit" className={`w-full font-bold py-3 rounded-md ${editingEndereco ? 'bg-blue-700' : 'bg-green-700'} text-white`}>
            {editingEndereco ? 'Salvar Alterações' : 'Salvar Novo Endereço'}
          </button>
          {editingEndereco && (
            <button type="button" onClick={handleCancelEdit} className="w-1/3 bg-slate-500 text-white font-bold py-3 rounded-md">
              Cancelar Edição
            </button>
          )}
        </div>
      </form>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">Endereços Cadastrados</h2>
        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="space-y-4">
            {enderecos.length === 0 ? <p>Nenhum endereço encontrado.</p> : enderecos.map((endereco) => (
              <div key={endereco.id} className="flex flex-wrap justify-between items-center p-4 border rounded-lg shadow-sm gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{endereco.rua}, {endereco.numero}</h3>
                  <p className="text-slate-600">{endereco.cidade} - {endereco.estado} (CEP: {endereco.cep})</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(endereco)} className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                  <button onClick={() => handleDelete(endereco.id)} className="bg-red-600 text-white px-3 py-1 rounded">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}