import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const especialidades = [
  "Clínico Geral", "Dermatologia", "Pediatria", "Ortopedia",
  "Cardiologia", "Neurologia", "Urologia", "Ginecologia", "Psiquiatria",
];

type AgendamentoFormData = {
    nome: string;
    telefone: string;
    email: string;
    data: string;
    hora: string;
    especialidade: string;
    observacoes?: string;
};

export default function MarcarConsulta() {
  const { register, handleSubmit, formState: { errors } } = useForm<AgendamentoFormData>();
  const navigate = useNavigate();

  const onSubmit = (data: AgendamentoFormData) => {
    console.log("Agendamento Válido:", data);
    alert("Agendamento recebido com sucesso! Redirecionando para a Home.");
    navigate('/');
  };

  return (
    <div className="py-10 px-4 bg-slate-50">
      {}
      <div className="mx-auto max-w-2xl xl:max-w-4xl bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Agende sua Consulta</h1>
          <p className="mt-2 text-slate-600">Preencha os campos abaixo para marcar sua consulta.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nome" className="font-semibold text-slate-700">Nome Completo</label>
              <input type="text" id="nome" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("nome", { required: "O nome é obrigatório" })} />
              {errors.nome && <small className="text-red-500">{errors.nome.message}</small>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="telefone" className="font-semibold text-slate-700">Telefone</label>
              <input type="tel" id="telefone" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("telefone", { required: "O telefone é obrigatório" })} />
              {errors.telefone && <small className="text-red-500">{errors.telefone.message}</small>}
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-semibold text-slate-700">E-mail</label>
            <input type="email" id="email" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("email", { required: "O e-mail é obrigatório" })} />
            {errors.email && <small className="text-red-500">{errors.email.message}</small>}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="data" className="font-semibold text-slate-700">Data da Consulta</label>
              <input type="date" id="data" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("data", { required: "A data é obrigatória" })} />
              {errors.data && <small className="text-red-500">{errors.data.message}</small>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="hora" className="font-semibold text-slate-700">Hora</label>
              <input type="time" id="hora" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("hora", { required: "A hora é obrigatória" })} />
              {errors.hora && <small className="text-red-500">{errors.hora.message}</small>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="especialidade" className="font-semibold text-slate-700">Especialidade</label>
            <select id="especialidade" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("especialidade", { required: "Selecione uma especialidade" })}>
              <option value="">Selecione...</option>
              {especialidades.map(esp => <option key={esp} value={esp}>{esp}</option>)}
            </select>
            {errors.especialidade && <small className="text-red-500">{errors.especialidade.message}</small>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="observacoes" className="font-semibold text-slate-700">Observações (Opcional)</label>
            <textarea id="observacoes" rows={4} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("observacoes")}></textarea>
          </div>
          
          <button type="submit" className="w-full bg-blue-800 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Agendar Consulta
          </button>
        </form>
      </div>
    </div>
  );
}