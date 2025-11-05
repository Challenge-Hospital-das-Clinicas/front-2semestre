import { useState } from 'react';

// 1. Importa todos os nossos CRUDs
import CrudMedicos from './CrudMedicos';
import CrudConvenio from './CrudConvenio';
import CrudEndereco from './CrudEndereco';
import CrudEspecialidade from './CrudEspecialidade';
import CrudPaciente from './CrudPaciente';
import CrudConsulta from './CrudConsulta';

// 2. Define os nomes das nossas abas
type Aba = 'consultas' | 'pacientes' | 'medicos' | 'convenios' | 'enderecos' | 'especialidades';

export default function AdminGeral() {
  // 3. Estado para controlar qual aba está ativa
  const [abaAtiva, setAbaAtiva] = useState<Aba>('consultas'); // Começa em Consultas

  // 4. Função para renderizar o componente da aba certa
  const renderAba = () => {
    switch (abaAtiva) {
      case 'consultas':
        return <CrudConsulta />;
      case 'pacientes':
        return <CrudPaciente />;
      case 'medicos':
        return <CrudMedicos />;
      case 'convenios':
        return <CrudConvenio />;
      case 'enderecos':
        return <CrudEndereco />;
      case 'especialidades':
        return <CrudEspecialidade />;
      default:
        return <CrudConsulta />;
    }
  };

  // Helper para mudar o estilo da aba ativa
  const getButtonClass = (aba: Aba) => {
    return `px-4 py-2 font-medium rounded-t-lg ${
      abaAtiva === aba
        ? 'font-semibold text-white bg-blue-700'
        : 'text-blue-300 hover:bg-blue-800'
    }`;
  };

  return (
    <div className="py-10 px-4 bg-slate-50">
      <div className="mx-auto max-w-7xl"> {/* Container bem largo */}
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
            Painel Administrativo (CRUDs)
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Gerenciamento completo do sistema HospitalTech
          </p>
        </div>

        {/* 5. As ABAS (Botões de Navegação) */}
        <div className="flex flex-wrap border-b border-blue-600 bg-blue-900 rounded-t-lg">
          <button className={getButtonClass('consultas')} onClick={() => setAbaAtiva('consultas')}>
            Consultas
          </button>
          <button className={getButtonClass('pacientes')} onClick={() => setAbaAtiva('pacientes')}>
            Pacientes
          </button>
          <button className={getButtonClass('medicos')} onClick={() => setAbaAtiva('medicos')}>
            Médicos
          </button>
          <button className={getButtonClass('convenios')} onClick={() => setAbaAtiva('convenios')}>
            Convênios
          </button>
          <button className={getButtonClass('enderecos')} onClick={() => setAbaAtiva('enderecos')}>
            Endereços
          </button>
          <button className={getButtonClass('especialidades')} onClick={() => setAbaAtiva('especialidades')}>
            Especialidades
          </button>
        </div>
        
        {/* 6. O CONTEÚDO (Onde o CRUD aparece) */}
        <div className="bg-white rounded-b-xl shadow-lg p-8">
          {renderAba()}
        </div>
      </div>
    </div>
  );
}