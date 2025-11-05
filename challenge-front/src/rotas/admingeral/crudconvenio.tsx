import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type Convenio = {
  id: number;
  nome: string;
  cobertura: string;
};

type ConvenioFormData = {
  nome: string;
  cobertura: string;
};

const defaultFormValues: ConvenioFormData = {
  nome: '',
  cobertura: ''
};

export default function CrudConvenio() {

  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingConvenio, setEditingConvenio] = useState<Convenio | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ConvenioFormData>({
    defaultValues: defaultFormValues
  });
  const API_URL = 'https://hospitaltech-api-latest.onrender.com/q/swagger-ui/#/';

  const fetchConvenios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/convenio`);
      if (!response.ok) {
        throw new Error(`A API (GET) retornou um erro: ${response.statusText}`);
      }
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

  useEffect(() => {
    fetchConvenios();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este convênio?")) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/convenio/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Erro da API (DELETE): ${response.statusText}`);
      }
      alert("Convênio excluído com sucesso!");
      fetchConvenios(); 
    } catch (err) {
      console.error("Falha ao excluir convênio:", err);
      let errorMessage = "Ocorreu um erro desconhecido";
      if (err instanceof Error) errorMessage = err.message;
      alert(`Erro ao excluir: ${errorMessage}`);
    }
  };

  const handleEdit = (convenio: Convenio) => {
    setEditingConvenio(convenio);
    reset({
      nome: convenio.nome,
      cobertura: convenio.cobertura,
    });
  };

  const handleCancelEdit = () => {
    setEditingConvenio(null);
    reset(defaultFormValues);
  };

  const onSubmit = async (data: ConvenioFormData) => {
    const payload = {
      id: editingConvenio ? editingConvenio.id : 0, 
      nome: data.nome,
      cobertura: data.cobertura,
    };

    const isUpdating = !!editingConvenio;
    const url = `${API_URL}/convenio`; 
    const method = isUpdating ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*' 
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || `Erro da API (${method}): ${response.statusText}`);
      }
      alert(`Convênio ${isUpdating ? 'atualizado' : 'cadastrado'} com sucesso!`);
      handleCancelEdit();
      fetchConvenios(); 
    } catch (err) {
      console.error(`Falha ao ${method} convênio:`, err);
      let errorMessage = "Ocorreu um erro desconhecido";
      if (err instanceof Error) errorMessage = err.message;
      alert(`Erro ao salvar: ${errorMessage}`);
    }
  };

  return (
    <div>
      {}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 mb-10 border-b pb-10">
        <h2 className="text-2xl font-semibold text-slate-700">
          {editingConvenio ? `Editando: ${editingConvenio.nome}` : 'Cadastrar Novo Convênio'}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nome" className="font-semibold text-slate-700">Nome do Convênio</label>
            <input 
              type="text" id="nome" 
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              {...register("nome", { required: "O nome é obrigatório" })} 
            />
            {errors.nome && <small className="text-red-500">{errors.nome.message}</small>}
          </div>
          
          {}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cobertura" className="font-semibold text-slate-700">Tipo de Cobertura</label>
            <input 
              type="text" id="cobertura" 
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              {...register("cobertura", { required: "A cobertura é obrigatória" })} 
            />
            {errors.cobertura && <small className="text-red-500">{errors.cobertura.message}</small>}
          </div>
        </div>
        
        <div className="flex gap-4">
          <button 
            type="submit" 
            className={`w-full font-bold py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${editingConvenio 
                ? 'bg-blue-700 text-white hover:bg-blue-600 focus:ring-blue-500' 
                : 'bg-green-700 text-white hover:bg-green-600 focus:ring-green-500'}
            `}
          >
            {editingConvenio ? 'Salvar Alterações (PUT)' : 'Salvar Novo Convênio (POST)'}
          </button>

          {editingConvenio && (
            <button 
              type="button" 
              onClick={handleCancelEdit}
              className="w-1/3 bg-slate-500 text-white font-bold py-3 rounded-md hover:bg-slate-400 transition-colors duration-200"
            >
              Cancelar Edição
            </button>
          )}
        </div>
      </form>

      {}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">Convênios Cadastrados (GET)</h2>
        
        {loading && <p className="text-center text-slate-500">Carregando lista de convênios...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {!loading && !error && (
          <div className="space-y-4">
            {convenios.length === 0 ? (
              <p className="text-center text-slate-500">Nenhum convênio encontrado no sistema.</p>
            ) : (
              convenios.map((convenio) => (
                <div key={convenio.id} className="flex flex-wrap justify-between items-center p-4 border rounded-lg shadow-sm gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{convenio.nome}</h3>
                    <p className="text-slate-600">Cobertura: {convenio.cobertura}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(convenio)} 
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 disabled:opacity-50"
                      disabled={loading}
                    >
                      Editar (PUT)
                    </button>
                    <button 
                      onClick={() => handleDelete(convenio.id)} 
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 disabled:opacity-50"
                      disabled={loading}
                    >
                      Excluir (DELETE)
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}