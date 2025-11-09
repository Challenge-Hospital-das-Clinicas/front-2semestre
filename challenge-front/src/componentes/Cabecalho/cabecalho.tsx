import { useState } from 'react';
import Menu from "../Menu/menu";

export default function Cabecalho() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-blue-900 text-white p-5 flex items-center justify-between shadow-md relative">
      
      {}
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-blue-900">
        HC
      </div>

      {}
      <div className="hidden md:flex">
        <Menu />
      </div>

      {}
      <button
        className="md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)} 
      >
        {}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-blue-900 shadow-lg md:hidden">
          {}
          <Menu isMobile={true} /> 
        </div>
      )}
    </header>
  );
}