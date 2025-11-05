import { useForm } from 'react-hook-form';

type ContatoFormData = {
  nome: string;
  email: string;
  mensagem: string;
};

export default function Contato() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContatoFormData>();

  const onSubmit = (data: ContatoFormData) => {
    console.log("Formulário de contato válido!", data);
    alert(`Obrigado pelo contato, ${data.nome}!`);
  };

  return (
    <div className="py-10 px-4">
      {}
      <div className="mx-auto max-w-2xl xl:max-w-4xl bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Entre em Contato
          </h1>
          <p className="mt-2 text-slate-600">
            Preencha o formulário e retornaremos o mais breve possível.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nome" className="font-semibold text-slate-700">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Digite seu nome completo"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("nome", { 
                required: "O nome é obrigatório",
                minLength: { value: 2, message: "O nome deve ter no mínimo 2 caracteres" } 
              })}
            />
            {errors.nome && <small className="text-red-500">{errors.nome.message}</small>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-semibold text-slate-700">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="seu.email@exemplo.com"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", { 
                required: "O e-mail é obrigatório",
                pattern: { value: /^\S+@\S+$/i, message: "Endereço de e-mail inválido" }
              })}
            />
            {errors.email && <small className="text-red-500">{errors.email.message}</small>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="mensagem" className="font-semibold text-slate-700">Mensagem</label>
            <textarea
              id="mensagem"
              rows={4}
              placeholder="Digite sua mensagem aqui..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("mensagem", { required: "A mensagem não pode estar em branco" })}
            />
            {errors.mensagem && <small className="text-red-500">{errors.mensagem.message}</small>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enviar Mensagem
          </button>
        </form>
      </div>
    </div>
  );
}