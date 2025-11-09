import { Link } from "react-router-dom";

type MenuProps = {
  isMobile?: boolean;
}

export default function Menu({ isMobile = false }: MenuProps) {
  const navClasses = isMobile
    ? "flex flex-col items-center p-4"
    : "flex items-center justify-center flex-wrap gap-x-5 gap-y-2"; 

  const linkClasses = isMobile
    ? "w-full text-center py-3 text-lg hover:bg-blue-800 transition-colors"
    : "text-lg font-bold transition-colors hover:text-sky-300";

  return (
    <nav className={navClasses}>
      <Link className={linkClasses} to="/">Home</Link>
      <Link className={linkClasses} to="/contato">Contato</Link>
      <Link className={linkClasses} to="/faq">FAQ</Link>
      <Link className={linkClasses} to="/integrantes">Equipe</Link>
      <Link className={linkClasses} to="/tutorial">Tutorial</Link>
      <Link className={linkClasses} to="/admin">Admin</Link>
    </nav>
  );
}