import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './globals.css'


import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './rotas/Home/index.tsx';
import Error from './rotas/Error/index.tsx';
import Contato from './rotas/Contato/index.tsx';
import Faq from './rotas/Faq/index.tsx';
import Tutorial from './rotas/Tutorial/index.tsx';
import Integrantes from './rotas/Integrantes/index.tsx'

 
const router = createBrowserRouter([
  {path:"/", element: <App/>, errorElement:<Error/>, children:[
    {path:"/", element: <Home/>},
    {path:"/Contato", element: <Contato/>},
    {path:"/Faq", element: <Faq/>},
    {path:"/Equipe", element: <Integrantes/>},
    {path:"/Tutorial", element: <Tutorial/>}
  ]}
]);
 
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
 