import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import './index.css'
import App from './App.tsx'


import Home from './rotas/Home/index.tsx'
import Contato from './rotas/Contato/index.tsx'
import Faq from './rotas/Faq/index.tsx'
import Integrantes from './rotas/Integrantes/index.tsx'
import Tutorial from './rotas/Tutorial/index.tsx'
import MarcarConsulta from './rotas/MarcarConsulta/index.tsx'


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