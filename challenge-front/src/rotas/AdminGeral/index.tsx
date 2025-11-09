import { useState } from 'react';
import CrudMedicos from './CrudMedico'; 
import CrudConvenio from './CrudConvenio';
import CrudEndereco from './CrudEndereco';
import CrudEspecialidade from './CrudEspecialidade';
import CrudPaciente from './CrudPaciente';
import CrudConsulta from './CrudConsulta';

type Aba = 'consultas' | 'pacientes' | 'medicos' | 'convenios' | 'enderecos' | 'especialidades';

export default function AdminGeral() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>('consultas');

  const renderAba = () => {
    switch (abaAtiva) {
      case 'consultas': return <CrudConsulta />;
      case 'pacientes': return <CrudPaciente />;
      case 'medicos': return <CrudMedicos />;
      case 'convenios': return <CrudConvenio />;
      case 'enderecos': return <CrudEndereco />;
      case 'especialidades': return <CrudEspecialidade />;
      default: return <CrudConsulta />;
    }
  };

  const getButtonClass = (aba: Aba) => {
    return `px-4 py-2 font-medium rounded-t-lg ${
      abaAtiva === aba ? 'font-semibold text-white bg-blue-700' : 'text-blue-300 hover:bg-blue-800'
    }`;
  };

  return (
    <div className="py-10 px-4 bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Painel Administrativo (CRUDs)</h1>
          <p className="mt-2 text-lg text-slate-600">Gerenciamento completo do sistema HospitalTech</p>
        </div>
        <div className="flex flex-wrap border-b border-blue-600 bg-blue-900 rounded-t-lg">
          <button className={getButtonClass('consultas')} onClick={() => setAbaAtiva('consultas')}>Consultas</button>
          <button className={getButtonClass('pacientes')} onClick={() => setAbaAtiva('pacientes')}>Pacientes</button>
          <button className={getButtonClass('medicos')} onClick={() => setAbaAtiva('medicos')}>Médicos</button>
          <button className={getButtonClass('convenios')} onClick={() => setAbaAtiva('convenios')}>Convênios</button>
          <button className={getButtonClass('enderecos')} onClick={() => setAbaAtiva('enderecos')}>Endereços</button>
          <button className={getButtonClass('especialidades')} onClick={() => setAbaAtiva('especialidades')}>Especialidades</button>
        </div>
        <div className="bg-white rounded-b-xl shadow-lg p-8">
          {renderAba()}
        </div>
      </div>
    </div>
  );
}