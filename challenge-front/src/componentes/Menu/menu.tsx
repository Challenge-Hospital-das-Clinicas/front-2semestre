import { Link } from "react-router-dom";

type MenuProps = {
  isMobile?: boolean; 
}

export default function Menu({ isMobile = false }: MenuProps) {
  
  const navClasses = isMobile
    ? "flex flex-col items-center p-4" 
    : "flex items-center gap-5";      


  const linkClasses = isMobile
    ? "w-full text-center py-3 text-lg hover:bg-blue-800 transition-colors" 
    : "text-lg font-bold transition-colors hover:text-sky-300"; 

  return (
    <nav className={navClasses}>
      <Link className={linkClasses} to="/">Home</Link>
      <Link className={linkClasses} to="/Contato">Contato</Link>
      <Link className={linkClasses} to="/Faq">FAQ</Link>
      <Link className={linkClasses} to="/Integrantes">Equipe</Link>
      <Link className={linkClasses} to="/Tutorial">Tutorial</Link>
      <Link className={linkClasses} to="/equipe-medica">Médicos</Link>
    </nav>
  );
}