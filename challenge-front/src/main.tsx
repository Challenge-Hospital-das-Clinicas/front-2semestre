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
import ErrorPage from './rotas/error/index.tsx' 

import AdminGeral from './rotas/AdminGeral/index.tsx' 


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    errorElement: <ErrorPage />, 
    
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
        
        path: "/admin", 
        element: <AdminGeral /> 
      },
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)