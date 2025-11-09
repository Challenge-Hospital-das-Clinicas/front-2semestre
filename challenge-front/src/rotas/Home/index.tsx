import { Link } from 'react-router-dom';

const equipePreview = [
  { name: 'Pedro Henrique' },
  { name: 'Guilherme Macedo' },
];

export default function Home() {
  return (
    <div className="bg-slate-50">

      {}
      <section className="bg-blue-800 text-white text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Cuidando da sua Saúde com Excelência
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-blue-100">
          Agende sua consulta de forma rápida e segura. Nossa equipe está pronta para te atender.
        </p>
        <Link 
          to="/marcar-consulta" 
          className="mt-8 inline-block bg-white text-blue-800 font-bold text-lg px-8 py-3 rounded-full hover:bg-slate-200 transition-colors duration-300"
        >
          Marcar Consulta Agora
        </Link>
      </section>

      {}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-slate-800">
          Conheça Nossa Equipe
        </h2>
        {}
        <p className="mt-2 max-w-2xl mx-auto text-slate-600">
          Os desenvolvedores do site
        </p>
        
        {}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {equipePreview.map((membro) => (
            <div key={membro.name} className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-center h-40">
              <h3 className="text-xl font-semibold text-slate-800 text-center">{membro.name}</h3>
            </div>
          ))}
        </div>
        <Link 
          to="/integrantes" 
          className="mt-10 inline-block text-blue-700 font-semibold hover:underline"
        >
          Ver todos os integrantes →
        </Link>
      </section>

      {}
      <section className="bg-slate-100 py-16 px-4">
        <div className="grid md:grid-cols-2 gap-8 text-center max-w-5xl xl:max-w-7xl mx-auto">
          {}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800">Dúvidas Frequentes</h3>
            <p className="mt-2 text-slate-600">
              Tire suas dúvidas sobre nossos serviços e procedimentos.
            </p>
            <Link 
              to="/faq" 
              className="mt-6 inline-block bg-blue-100 text-blue-800 font-bold px-6 py-2 rounded-full hover:bg-blue-200 transition-colors"
            >
              Acessar FAQ
            </Link>
          </div>
          {}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800">Vídeos e Dicas</h3>
            <p className="mt-2 text-slate-600">
              Acesse nosso conteúdo com dicas de saúde e tutoriais.
            </p>
            <Link 
              to="/tutorial" 
              className="mt-6 inline-block bg-blue-100 text-blue-800 font-bold px-6 py-2 rounded-full hover:bg-blue-200 transition-colors"
            >
              Ver Dicas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}