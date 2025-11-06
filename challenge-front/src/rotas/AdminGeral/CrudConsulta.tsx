import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type Endereco = {
  id: number;
  rua: string;
  numero: number;
  cidade: string;
  estado: string;
  cep: string;
};

type Convenio = {
  id: number;
  nome: string;
  cobertura: string;
};

type Paciente = {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: Endereco;
  convenio: Convenio;
};

type Medico = {
  id: number;
  nome: string;
  crm: string;
  especialidades: unknown; 
  especialidade?: unknown;
};

type Consulta = {
  id: number;
  paciente: Paciente;
  medico: Medico;
  dataHora: string;
  status: string;
};

type ConsultaFormData = {
  pacienteId: number;
  medicoId: number;
  dataHora: string;
  status: string;
};

const defaultFormValues: ConsultaFormData = {
  pacienteId: 0,
  medicoId: 0,
  dataHora: '',
  status: 'AGENDADA',
};

export default function CrudConsulta() {
 
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingConsulta, setEditingConsulta] = useState<Consulta | null>(null);

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ConsultaFormData>({
    defaultValues: defaultFormValues
  });
  const API_URL = '/api'; 

  const fetchDados = async () => {
    setLoading(true); setError(null);
    try {
      const headers = { 'Accept': 'application/json' };
      const [conRes, pacRes, medRes] = await Promise.all([
        fetch(`${API_URL}/consulta`, { headers }),
        fetch(`${API_URL}/paciente`, { headers }),
        fetch(`${API_URL}/medico`, { headers })
      ]);
      if (!conRes.ok) throw new Error(`Erro ao buscar consultas`);
      if (!pacRes.ok) throw new Error(`Erro ao buscar pacientes`);
      if (!medRes.ok) throw new Error(`Erro ao buscar médicos`);

      const conData: Consulta[] = await conRes.json();
      const pacData: Paciente[] = await pacRes.json();
      const medData: Medico[] = await medRes.json();

      setConsultas(conData);
      setPacientes(pacData);
      setMedicos(medData);
    } catch (err) {
      console.error("Falha ao buscar dados:", err);
      let errorMessage = "Não foi possível carregar os dados.";
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
      const response = await fetch(`${API_URL}/consulta/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`Erro da API (DELETE)`);
      alert("Consulta excluída!");
      fetchDados(); 
    } catch (err) {
      console.error("Falha ao excluir consulta:", err);
      let errorMessage = "Erro desconhecido";
      if (err instanceof Error) errorMessage = err.message;
      alert(`Erro ao excluir: ${errorMessage}`);
    }
  };

  const handleEdit = (consulta: Consulta) => {
    setEditingConsulta(consulta);
    reset({
      pacienteId: consulta.paciente.id,
      medicoId: consulta.medico.id,
      dataHora: consulta.dataHora.substring(0, 16), 
      status: consulta.status,
    });
  };

  const handleCancelEdit = () => {
    setEditingConsulta(null);
    reset(defaultFormValues);
  };


  const onSubmit = async (data: ConsultaFormData) => {
    const pacienteObj = pacientes.find(p => p.id === Number(data.pacienteId));
    const medicoObj = medicos.find(m => m.id === Number(data.medicoId));

    if (!pacienteObj || !medicoObj) {
      alert("Erro: Paciente ou Médico não encontrado.");
      return;
    }
    
    
    const payload = { 
      id: editingConsulta ? editingConsulta.id : 0, 
      paciente: pacienteObj,
      medico: medicoObj,
      dataHora: new Date(data.dataHora).toISOString(), 
      status: data.status
    };
    
    const isUpdating = !!editingConsulta;
    const url = `${API_URL}/consulta`;
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
      alert(`Consulta ${isUpdating ? 'atualizada' : 'cadastrada'}!`);
      handleCancelEdit();
      fetchDados(); 
    } catch (err) {
      console.error(`Falha ao ${method} consulta:`, err);
      let errorMessage = "Erro desconhecido";
      if (err instanceof Error) errorMessage = err.message;
      alert(`Erro ao salvar: ${errorMessage}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 mb-10 border-b pb-10">
        <h2 className="text-2xl font-semibold text-slate-700">
          {editingConsulta ? `Editando Consulta #${editingConsulta.id}` : 'Agendar Nova Consulta'}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pacienteId" className="font-semibold text-slate-700">Paciente</label>
            <select id="pacienteId" className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("pacienteId", { required: "Paciente obrigatório", valueAsNumber: true, validate: v => v > 0 || "Selecione" })}>
              <option value={0}>Selecione um paciente...</option>
              {pacientes.map(pac => (
                <option key={pac.id} value={pac.id}>{pac.nome} (CPF: {pac.cpf})</option>
              ))}
            </select>
            {errors.pacienteId && <small className="text-red-500">{errors.pacienteId.message}</small>}
          </div>
          <div>
            <label htmlFor="medicoId" className="font-semibold text-slate-700">Médico</label>
            <select id="medicoId" className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("medicoId", { required: "Médico obrigatório", valueAsNumber: true, validate: v => v > 0 || "Selecione" })}>
              <option value={0}>Selecione um médico...</option>
              {medicos.map(med => (
                <option key={med.id} value={med.id}>{med.nome} (CRM: {med.crm})</option>
              ))}
            </select>
            {errors.medicoId && <small className="text-red-500">{errors.medicoId.message}</small>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="dataHora" className="font-semibold text-slate-700">Data e Hora</label>
            <input type="datetime-local" id="dataHora" className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("dataHora", { required: "Data obrigatória" })} />
            {errors.dataHora && <small className="text-red-500">{errors.dataHora.message}</small>}
          </div>
          <div>
            <label htmlFor="status" className="font-semibold text-slate-700">Status</label>
            <input type="text" id="status" className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md" {...register("status", { required: "Status obrigatório" })} />
            {errors.status && <small className="text-red-500">{errors.status.message}</small>}
          </div>
        </div>
        
        <div className="flex gap-4">
          <button type="submit" className={`w-full font-bold py-3 rounded-md ${editingConsulta ? 'bg-blue-700' : 'bg-green-700'} text-white`}>
            {editingConsulta ? 'Salvar Alterações (PUT)' : 'Salvar Nova Consulta (POST)'}
          </button>
          {editingConsulta && (
            <button type="button" onClick={handleCancelEdit} className="w-1/3 bg-slate-500 text-white font-bold py-3 rounded-md">
              Cancelar Edição
            </button>
          )}
        </div>
      </form>

      {}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">Consultas Agendadas (GET)</h2>
        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="space-y-4">
            {consultas.length === 0 ? <p>Nenhuma consulta encontrada.</p> : consultas.map((consulta) => (
              <div key={consulta.id} className="flex flex-wrap justify-between items-center p-4 border rounded-lg shadow-sm gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Consulta #{consulta.id} - {consulta.status}</h3>
                  <p className="text-slate-600">Paciente: {consulta.paciente?.nome}</p>
                  <p className="text-slate-600">Médico: {consulta.medico?.nome}</p>
                  <p className="text-sm text-slate-500">Data: {new Date(consulta.dataHora).toLocaleString('pt-BR')}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(consulta)} className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                  <button onClick={() => handleDelete(consulta.id)} className="bg-red-600 text-white px-3 py-1 rounded">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}