import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// 1. Importe o CSS global e o componente App (nosso layout principal)
import './index.css'
import App from './App.tsx'

// 2. Importe TODAS as páginas que criamos
import Home from './rotas/Home/index.tsx'
import Contato from './rotas/Contato/index.tsx'
import Faq from './rotas/Faq/index.tsx'
import Integrantes from './rotas/Integrantes/index.tsx'
import Tutorial from './rotas/Tutorial/index.tsx'
import MarcarConsulta from './rotas/MarcarConsulta/index.tsx'

// 3. Crie o roteador com a definição de todas as nossas rotas
const router = createBrowserRouter([
  {
    // A rota pai "/" usa o <App /> como layout
    path: "/",
    element: <App />,
    // As rotas filhas serão renderizadas dentro do <Outlet /> do App
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
    ],
  },
]);

// 4. Renderize a aplicação usando o RouterProvider
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)