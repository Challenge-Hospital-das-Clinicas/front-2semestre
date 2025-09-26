import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="flex items-center gap-5">
      <Link className="text-lg font-bold transition-colors hover:text-sky-300" to="/">Home</Link>
      <Link className="text-lg font-bold transition-colors hover:text-sky-300" to="/Contato">Contato</Link>
      <Link className="text-lg font-bold transition-colors hover:text-sky-300" to="/Faq">FAQ</Link>
      <Link className="text-lg font-bold transition-colors hover:text-sky-300" to="/Integrantes">Equipe</Link>
      <Link className="text-lg font-bold transition-colors hover:text-sky-300" to="/Tutorial">Tutorial</Link>
    </nav>
  );
}