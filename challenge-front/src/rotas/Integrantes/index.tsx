import pedro from "../../assets/img/pedro.jpeg"; 
import guilherme from "../../assets/img/WhatsApp Image 2025-09-26 at 15.25.47.jpeg";

const equipe = [
  {
    name: "Pedro Henrique Luiz Alves Duarte",
    imgSrc: pedro,
    rm: "563405",  
    turma: "1TDSPF", 
  },
  
  {
    name: "Guilherme Macedo Martins",
    imgSrc: guilherme,
    rm: "562396",   
    turma: "1TDSPF", 
  },
];

export default function Integrantes() {
  return (
    <div className="py-10 px-4 bg-slate-50">
      <div className="mx-auto max-w-5xl">
        {}
        
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
              
              {}
              <p className="mt-2 text-slate-600 font-medium">
                RM: {membro.rm}
              </p>
              <p className="text-slate-600 font-medium">
                Turma: {membro.turma}
              </p>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}