


import gabriel from "../../assets/img/gabriel.jpeg";
import pedro from "../../assets/img/pedro.jpeg"; 
import guilherme from "../../assets/img/WhatsApp Image 2025-09-26 at 15.25.47.jpeg";


const equipe = [
  {
    name: "Pedro Henrique Luiz Alves Duarte",
    imgSrc: pedro,
  },
  {
    name: "Gabriel Hayashi Monteiro",
    imgSrc: gabriel,
  },
  {
    name: "Guilherme Macedo Martins",
    imgSrc: guilherme,
  },
];

export default function Integrantes() {
  return (
    <div className="py-10 px-4 bg-slate-50">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
            Nossa Equipe
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Conheça os profissionais por trás do nosso atendimento.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipe.map((membro) => (
            <div 
              key={membro.name} 
              className="bg-white rounded-xl shadow-lg p-6 text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
             
              <img
                src={membro.imgSrc}
                alt={`Foto de ${membro.name}`}
                className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-slate-200"
              />
              <h2 className="mt-5 text-xl font-semibold text-slate-800">
                {membro.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}