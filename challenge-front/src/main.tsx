import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// 1. Importa o CSS Global (que importa o Tailwind)
import './index.css'

// 2. Importa o Layout Principal
import App from './App.tsx'

// 3. Importa TODAS as nossas páginas (Usando a sua estrutura 'src/rotas/')
import Home from './rotas/home/index.tsx'
import Contato from './rotas/contato/index.tsx'
import Faq from './rotas/faq/index.tsx'
import Integrantes from './rotas/integrantes/index.tsx'
import Tutorial from './rotas/tutorial/index.tsx'
import MarcarConsulta from './rotas/marcarConsulta/index.tsx'
import Medico from './rotas/medicos/index.tsx' // <-- Corrigido!

// 4. Cria o roteador
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contato",
        element: <Contato />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/integrantes",
        element: <Integrantes />,
      },
      {
        path: "/tutorial",
        element: <Tutorial />,
      },
      {
        path: "/marcar-consulta",
        element: <MarcarConsulta />,
      },
      {
        path: "/medico", // A URL que você vai acessar
        element: <Medico />, // O componente que vai carregar (o CRUD)
      },
    ],
  },
]);

// 5. Renderiza a aplicação
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)