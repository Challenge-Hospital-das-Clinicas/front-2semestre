import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type Endereco = { id: number; rua: string; numero: number; cidade: string; estado: string; cep: string; };
type Convenio = { id: number; nome: string; cobertura: string; };
type Paciente = { id: number; nome: string; cpf: string; telefone: string; endereco: Endereco; convenio: Convenio; };
type PacienteFormData = { nome: string; cpf: string; telefone: string; enderecoId: number; convenioId: number; };
const defaultFormValues: PacienteFormData = { nome: '', cpf: '', telefone: '', enderecoId: 0, convenioId: 0 };

export default function CrudPaciente() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PacienteFormData>({ defaultValues: defaultFormValues });
  const API_URL = 'https://hospitaltech-api-latest.onrender.com';

  const fetchDados = async () => {
    setLoading(true); setError(null);
    try {
      const [pacRes, endRes, convRes] = await Promise.all([
        fetch(`${API_URL}/paciente`),
        fetch(`${API_URL}/endereco`),
        fetch(`${API_URL}/convenio`)
      ]);
      if (!pacRes.ok) throw new Error(`Erro ao buscar pacientes`);
      if (!endRes.ok) throw new Error(`Erro ao buscar endereços`);
      if (!convRes.ok) throw new Error(`Erro ao buscar convênios`);
      const pacData: Paciente[] = await pacRes.json();
      const endData: Endereco[] = await endRes.json();
      const convData: Convenio[] = await convRes.json();
      setPacientes(pacData);
      setEnderecos(endData);
      setConvenios(convData);
    } catch (err) {
      console.error("Falha ao buscar dados:", err);
      let errorMessage = "Não foi possível carregar a lista de pacientes.";
      if (err instanceof Error) errorMessage = err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDados(); }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza?")) return;
    try {
      const response = await fetch(`${API_URL}/paciente/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`Erro da API (DELETE)`);
      alert("Paciente excluído!");
      fetchDados(); 
    } catch (err) {
      console.error("Falha ao excluir paciente:", err);
      let errorMessage = "Erro desconhecido";
      if (err instanceof Error) errorMessage = err.message;
      alert(`Erro ao excluir: ${errorMessage}`);
    }
  };

  const handleEdit = (paciente: Paciente) => {
    setEditingPaciente(paciente);
    reset({
      nome: paciente.nome,
      cpf: paciente.cpf,
      telefone: paciente.telefone,
      enderecoId: paciente.endereco.id,
      convenioId: paciente.convenio.id,
    });
  };

  const handleCancelEdit = () => {
    setEditingPaciente(null);
    reset(defaultFormValues);
  };

  const onSubmit = async (data: PacienteFormData) => {
    const enderecoObj = enderecos.find(e => e.id === Number(data.enderecoId));
    const convenioObj = convenios.find(c => c.id === Number(data.convenioId));
    if (!enderecoObj || !convenioObj) {
      alert("Erro: Endereço ou Convênio não encontrado. Cadastre-os primeiro.");
      return;
    }
    const payload = { 
      id: editingPaciente ? editingPaciente.id : 0, 
      nome: data.nome,
      cpf: data.cpf,
      telefone: data.telefone,
      endereco: enderecoObj,
      convenio: convenioObj
    };
    const isUpdating = !!editingPaciente;
    const url = `${API_URL}/paciente`;
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
      alert(`Paciente ${isUpdating ? 'atualizado' : 'cadastrado'}!`);
      handleCancelEdit();
      fetchDados(); 
    } catch (err) {
      console.error(`Falha ao ${method} paciente:`, err);
      let errorMessage = "Erro desconhecido";
      if (err instanceof Error) errorMessage = err.message;
      alert(`Erro ao salvar: ${errorMessage}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 mb-10 border-b pb-10">
        <h2 className="text-2xl font-semibold text-slate-700">
          {editingPaciente ? `Editando: ${editingPaciente.nome}` : 'Cadastrar Novo Paciente'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="nome" className="font-semibold text-slate-700">Nome Completo</label>
            <input type="text" id="nome" className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("nome", { required: "Nome obrigatório" })} />
            {errors.nome && <small className="text-red-500">{errors.nome.message}</small>}
          </div>
          <div>
            <label htmlFor="cpf" className="font-semibold text-slate-700">CPF</label>
            <input type="text" id="cpf" className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("cpf", { required: "CPF obrigatório" })} />
            {errors.cpf && <small className="text-red-500">{errors.cpf.message}</small>}
          </div>
          <div>
            <label htmlFor="telefone" className="font-semibold text-slate-700">Telefone</label>
            <input type="tel" id="telefone" className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("telefone", { required: "Telefone obrigatório" })} />
            {errors.telefone && <small className="text-red-500">{errors.telefone.message}</small>}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="enderecoId" className="font-semibold text-slate-700">Endereço</label>
            <select id="enderecoId" className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("enderecoId", { required: "Endereço obrigatório", valueAsNumber: true, validate: v => v > 0 || "Selecione" })}>
              <option value={0}>Selecione um endereço...</option>
              {enderecos.map(end => (
                <option key={end.id} value={end.id}>{end.rua}, {end.numero} - {end.cidade}</option>
              ))}
            </select>
            {errors.enderecoId && <small className="text-red-500">{errors.enderecoId.message}</small>}
          </div>
          <div>
            <label htmlFor="convenioId" className="font-semibold text-slate-700">Convênio</label>
            <select id="convenioId" className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("convenioId", { required: "Convênio obrigatório", valueAsNumber: true, validate: v => v > 0 || "Selecione" })}>
              <option value={0}>Selecione um convênio...</option>
              {convenios.map(conv => (
                <option key={conv.id} value={conv.id}>{conv.nome}</option>
              ))}
            </select>
            {errors.convenioId && <small className="text-red-500">{errors.convenioId.message}</small>}
          </div>
        </div>
        <div className="flex gap-4">
          <button type="submit" className={`w-full font-bold py-3 rounded-md ${editingPaciente ? 'bg-blue-700' : 'bg-green-700'} text-white`}>
            {editingPaciente ? 'Salvar Alterações (PUT)' : 'Salvar Novo Paciente (POST)'}
          </button>
          {editingPaciente && (
            <button type="button" onClick={handleCancelEdit} className="w-1/3 bg-slate-500 text-white font-bold py-3 rounded-md">
              Cancelar Edição
            </button>
          )}
        </div>
      </form>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">Pacientes Cadastrados (GET)</h2>
        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="space-y-4">
            {pacientes.length === 0 ? <p>Nenhum paciente encontrado.</p> : pacientes.map((paciente) => (
              <div key={paciente.id} className="flex flex-wrap justify-between items-center p-4 border rounded-lg shadow-sm gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{paciente.nome} (ID: {paciente.id})</h3>
                  <p className="text-slate-600">CPF: {paciente.cpf} | Tel: {paciente.telefone}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(paciente)} className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                  <button onClick={() => handleDelete(paciente.id)} className="bg-red-600 text-white px-3 py-1 rounded">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}