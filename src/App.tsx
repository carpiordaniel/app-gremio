import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Menu } from './componets/menu/Menu'
import { Gremios } from './layauts/pages/gremios/Gremios'
import { Login } from './layauts/pages/login/Login'
import { Registros } from './layauts/pages/registros/Registros'
import { ValidarRegistros } from './layauts/pages/validar-registros/ValidarRegistros'
import { Comprobantes } from './layauts/pages/comprobantes/Comprobantes'
import { Gremio } from './layauts/pages/parametros/gremio/Gremio'
import { Categoria } from './layauts/pages/parametros/categoria/Categoria'
import { Deporte } from './layauts/pages/parametros/deporte/Deporte'
import { Carrera } from './layauts/pages/parametros/carrera/Carrera'
import { Presiendente } from './layauts/pages/parametros/presidente/Presiendente'
import { ProtectedRoute } from './componets/menu/ProtectedRoute'
import { ValidarComprobantes } from './layauts/pages/comprobantes/validaComprobante'

function App() {
  const token = localStorage.getItem('data');
  const permited: boolean = token ? true : false;
  console.log(token)

  if (token) {
    console.log('Usuario autenticado');
  } else {
    console.log('Usuario no autenticado');
  }


  return (
    <main className={`main-app ${ token ? 'si-token' : 'no-token'}`}>

      <BrowserRouter>
        <Menu />
        <div className="contenedor-app">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute canActivate={permited} redirectPath='/login' />}>
              <Route path="/" element={<Registros />} />
              <Route path="/gr/gremios" element={<Gremios />} />
              <Route path="/gr/validar-registros" element={<ValidarRegistros />} />
              <Route path="/gr/comprobantes/subir" element={<Comprobantes />} />
              <Route path="/gr/comprobantes/validar" element={<ValidarComprobantes />} />
              <Route path="/gr/param/gremio" element={<Gremio />} />
              <Route path="/gr/param/categoria" element={<Categoria />} />
              <Route path="/gr/param/deporte" element={<Deporte />} />
              <Route path="/gr/param/carrera" element={<Carrera />} />
              <Route path="/gr/param/presidente" element={<Presiendente />} />
            </Route>
              <Route path="*" element={<img src="../img/404-status-code.png" style={{ width: '100%' }} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}

export default App;

 
