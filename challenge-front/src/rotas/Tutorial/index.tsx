const dicas = [
  {
    title: "1. Mantenha seus dados atualizados",
    description: "Isso facilita o contato e melhora o atendimento.",
  },
  {
    title: "2. Use senhas seguras",
    description: "Evite usar datas de nascimento ou nomes simples. Combine letras, números e símbolos.",
  },
  {
    title: "3. Faça backup regularmente",
    description: "Guarde cópias dos seus dados para evitar perdas em caso de problemas técnicos.",
  },
  {
    title: "4. Leia as instruções antes de preencher formulários",
    description: "Assim você evita erros que podem atrasar seu atendimento.",
  },
  {
    title: "5. Fique atento aos horários de funcionamento",
    description: "Consulte os horários antes de comparecer ao local para evitar imprevistos.",
  },
  {
    title: "6. Em caso de dúvidas, entre em contato",
    description: "Estamos à disposição para esclarecer qualquer questão.",
  },
];

export default function Tutorial() {
  return (
    <div className="py-10 px-4 bg-slate-50">
      {}
      <div className="mx-auto max-w-3xl xl:max-w-5xl bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
            Dicas e Tutoriais
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Aproveite ao máximo nossos serviços com estas dicas úteis.
          </p>
        </div>

        <div className="space-y-6 divide-y divide-slate-200">
          {dicas.map((dica, index) => (
            <div key={index} className={index > 0 ? 'pt-6' : ''}>
              <h2 className="text-xl font-semibold text-slate-800">
                {dica.title}
              </h2>
              <p className="mt-2 text-slate-600 leading-relaxed">
                {dica.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}