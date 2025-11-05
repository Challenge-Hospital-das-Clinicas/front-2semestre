import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// 1. Importa o CSS Global (que importa o Tailwind)
import './index.css'

// 2. Importa o Layout Principal
import App from './App.tsx'

// 3. Importa TODAS as nossas páginas
import Home from './pages/Home/index.tsx'
import Contato from './pages/Contato/index.tsx'
import Faq from './pages/Faq/index.tsx'
import Integrantes from './pages/Integrantes/index.tsx'
import Tutorial from './pages/Tutorial/index.tsx'
import MarcarConsulta from './pages/MarcarConsulta/index.tsx'
import EquipeMedica from './pages/EquipeMedica/index.tsx'
import AdminMedicos from './pages/AdminMedicos/index.tsx' // A página do CRUD

// 4. Cria o roteador
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // O layout principal (com Header/Footer)
    // 'children' são as páginas que aparecem DENTRO do layout
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
        path: "/equipe-medica",
        element: <EquipeMedica />, 
      },
      {
        path: "/admin-medicos",
        element: <AdminMedicos />, 
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)