import { Link } from "react-router-dom";
 
export default function Menu(){
 
    return(
        <nav className="cabecalh_nav">
            <Link to="/">Home </Link>|
            <Link to="/Contato"> Contato </Link>|
            <Link to="/Faq"> FAQ </Link> |
            <Link to="/Equipe"> Equipe </Link> |
            <Link to="/Tutorial"> Tutorial </Link>
        </nav>
    );
}