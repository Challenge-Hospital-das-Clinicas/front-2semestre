import { Outlet } from 'react-router-dom';
import Cabecalho from './componentes/Cabecalho/cabecalho'; 
import Rodape from './componentes/Rodape/rodape';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Cabecalho />
      
      {}
      <main className="flex-grow">
        <Outlet /> {}
      </main>
      
      <Rodape />
    </div>
  )
}

export default App