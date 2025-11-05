import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import './index.css'
import App from './App.tsx'


import Home from './rotas/home/index.tsx'
import Contato from './rotas/contato/index.tsx'
import Faq from './rotas/faq/index.tsx'
import Integrantes from './rotas/integrantes/index.tsx'
import Tutorial from './rotas/tutorial/index.tsx'
import MarcarConsulta from './rotas/marcarConsulta/index.tsx'


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
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)