import Menu from "../Menu/menu";

export default function Cabecalho() {
  return (
    <header className="w-full bg-blue-900 text-white p-5 flex items-center justify-between shadow-md">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-blue-900">
        HC
      </div>
      
      <Menu />
    </header>
  );
}