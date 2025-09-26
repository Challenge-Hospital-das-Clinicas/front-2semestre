
const faqData = [
  {
    question: "1. Como posso entrar em contato com a equipe?",
    answer: "Através do formulário na página de contato.",
  },
  {
    question: "2. Quais são os horários de atendimento?",
    answer: "De segunda a sexta, das 8h às 18h.",
  },
  {
    question: "3. Onde vocês estão localizados?",
    answer: "Av. Dr. Enéas de Carvalho Aguiar, 255 - São Paulo, SP.",
  },
  {
    question: "4. Como faço para cancelar um agendamento?",
    answer: "Basta entrar em contato com 24 horas de antecedência.",
  },
  {
    question: "5. Os dados inseridos no site são protegidos?",
    answer: "Sim, todos os dados são tratados com segurança e conforme a LGPD.",
  },
];

export default function Faq() {
  return (
   
    <div className="py-10 px-4">

      
      <div className="mx-auto max-w-3xl bg-white rounded-xl shadow-lg p-8">
        
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Dúvidas Frequentes
          </h1>
          <p className="mt-2 text-slate-600">
            Encontre aqui as respostas para as perguntas mais comuns.
          </p>
        </div>

        
        <div className="space-y-6">
          
          {faqData.map((item, index) => (
            <div key={index}>
              <h2 className="text-lg font-semibold text-slate-800">
                {item.question}
              </h2>
              <p className="mt-1 text-slate-600 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}