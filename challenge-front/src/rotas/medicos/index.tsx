import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// --- TIPOS (Baseado no que vimos no Swagger) ---

type MedicoDaLista = {
  id: number;
  nome: string;
  crm: string;
  especialidades: {
    id: number;
    nome: string;
  }[];
};

type MedicoFormData = {
    nome: string;
    crm: string;
    especialidadeNome: string; 
};

// VALORES PADRÃO DO FORMULÁRIO (para limpar ele)
const defaultFormValues: MedicoFormData = {
  nome: '',
  crm: '',
  especialidadeNome: ''
};

export default function AdminMedicos() {
  // --- ESTADOS ---
  const [medicos, setMedicos] = useState<MedicoDaLista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingDoctor, setEditingDoctor] = useState<MedicoDaLista | null>(null);

  // --- CONFIGURAÇÃO DO FORMULÁRIO ---
  const { register, handleSubmit, formState: { errors }, reset } = useForm<MedicoFormData>({
    defaultValues: defaultFormValues
  });
  const API_URL = 'https://hospitaltech-api-latest.onrender.com';

  // --- FUNÇÃO DE 'READ' (GET) ---
  const fetchMedicos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/medico`);
      if (!response.ok) {
        throw new Error(`A API (GET) retornou um erro: ${response.statusText}`);
      }
      const data: MedicoDaLista[] = await response.json();
      setMedicos(data);
    } catch (err) {
      console.error("Falha ao buscar médicos:", err);
      // Aqui a gente só passa a string, então tá OK
      setError("Não foi possível carregar la lista de médicos.");
    } finally {
      setLoading(false);
    }
  };

  // --- BUSCA INICIAL (Roda 1x quando a página abre) ---
  useEffect(() => {
    fetchMedicos();
  }, []);

  // --- FUNÇÃO DE 'DELETE' (EXCLUIR) ---
  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este médico?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/medico/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Erro da API (DELETE): ${response.statusText}`);
      }

      alert("Médico excluído com sucesso!");
      fetchMedicos(); 

    } catch (err) {
      console.error("Falha ao excluir médico:", err);
      
      // ** A CORREÇÃO ESTÁ AQUI **
      // Verificamos o tipo de 'err' antes de usar 'err.message'
      let errorMessage = "Ocorreu um erro desconhecido";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert(`Erro ao excluir: ${errorMessage}`);
    }
  };

  // --- FUNÇÃO PARA 'INICIAR A EDIÇÃO' (UPDATE) ---
  const handleEdit = (medico: MedicoDaLista) => {
    setEditingDoctor(medico);
    reset({
      nome: medico.nome,
      crm: medico.crm,
      especialidadeNome: medico.especialidades[0]?.nome || ''
    });
  };

  // --- FUNÇÃO PARA 'CANCELAR A EDIÇÃO' ---
  const handleCancelEdit = () => {
    setEditingDoctor(null);
    reset(defaultFormValues);
  };

  // --- FUNÇÃO DE 'CREATE' E 'UPDATE' (POST / PUT) ---
  const onSubmit = async (data: MedicoFormData) => {
    const payload = {
      id: editingDoctor ? editingDoctor.id : 0, 
      nome: data.nome,
      crm: data.crm,
      especialidades: { id: 0, nome: data.especialidadeNome },
      especialidade: { id: 0, nome: data.especialidadeNome }
    };

    const isUpdating = !!editingDoctor;
    const url = `${API_URL}/medico`; // URL é a mesma para POST e PUT
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

      alert(`Médico ${isUpdating ? 'atualizado' : 'cadastrado'} com sucesso!`);
      handleCancelEdit();
      fetchMedicos(); 
      
    } catch (err) {
      console.error(`Falha ao ${method} médico:`, err);

      // ** A CORREÇÃO ESTÁ AQUI **
      // Verificamos o tipo de 'err' antes de usar 'err.message'
      let errorMessage = "Ocorreu um erro desconhecido";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert(`Erro ao salvar: ${errorMessage}`);
    }
  };

  // --- RENDERIZAÇÃO DA PÁGINA (Não muda nada aqui) ---
  return (
    <div className="py-10 px-4 bg-slate-50">
      <div className="mx-auto max-w-5xl xl:max-w-7xl bg-white rounded-xl shadow-lg p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Gerenciamento de Médicos (CRUD)
          </h1>
        </div>

        {/* === FORMULÁRIO DE CADASTRO (CREATE / UPDATE) === */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 mb-10 border-b pb-10">
          
          <h2 className="text-2xl font-semibold text-slate-700">
            {editingDoctor ? `Editando: ${editingDoctor.nome}` : 'Cadastrar Novo Médico'}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Campo Nome */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nome" className="font-semibold text-slate-700">Nome Completo</label>
              <input 
                type="text" id="nome" 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                {...register("nome", { required: "O nome é obrigatório" })} 
              />
              {errors.nome && <small className="text-red-500">{errors.nome.message}</small>}
            </div>
            
            {/* Campo CRM */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="crm" className="font-semibold text-slate-700">CRM</label>
              <input 
                type="text" id="crm" 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                {...register("crm", { required: "O CRM é obrigatório" })} 
              />
              {errors.crm && <small className="text-red-500">{errors.crm.message}</small>}
            </div>

            {/* Campo Especialidade */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="especialidadeNome" className="font-semibold text-slate-700">Especialidade</label>
              <input 
                type="text" id="especialidadeNome" 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                {...register("especialidadeNome", { required: "A especialidade é obrigatória" })} 
              />
              {errors.especialidadeNome && <small className="text-red-500">{errors.especialidadeNome.message}</small>}
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              type="submit" 
              className={`w-full font-bold py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${editingDoctor 
                  ? 'bg-blue-700 text-white hover:bg-blue-600 focus:ring-blue-500' 
                  : 'bg-green-700 text-white hover:bg-green-600 focus:ring-green-500'}
              `}
            >
              {editingDoctor ? 'Salvar Alterações (PUT)' : 'Salvar Novo Médico (POST)'}
            </button>

            {editingDoctor && (
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

        {/* === LISTA DE MÉDICOS (READ) === */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-700 mb-6">Médicos Cadastrados (GET)</h2>
          
          {loading && <p className="text-center text-slate-500">Carregando lista de médicos...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          
          {!loading && !error && (
            <div className="space-y-4">
              {medicos.length === 0 ? (
                <p className="text-center text-slate-500">Nenhum médico encontrado no sistema.</p>
              ) : (
                medicos.map((medico) => (
                  <div key={medico.id} className="flex flex-wrap justify-between items-center p-4 border rounded-lg shadow-sm gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{medico.nome}</h3>
                      <p className="text-slate-600">CRM: {medico.crm}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(medico)} 
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 disabled:opacity-50"
                        disabled={loading}
                      >
                        Editar (PUT)
                      </button>
                      <button 
                        onClick={() => handleDelete(medico.id)} 
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
    </div>
  );
}