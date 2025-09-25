import { Outlet } from "react-router-dom";
import Cabecalho from "./componentes/Cabecalho/cabecalho";
import Rodape from "./componentes/Rodape/rodape";
 
export default function App(){
 
  return(
    <div className="container">
      <Cabecalho/>
      <Outlet/>
      <Rodape/>
    </div>
  );
}
 