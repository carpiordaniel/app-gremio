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
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // Verificar si el usuario ya está autenticado
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Usuario autenticado');
      // Puedes hacer otras acciones aquí, como establecer el estado de autenticación
    } else {
      console.log('Usuario no autenticado');
      // Puedes redirigir al usuario a la página de inicio de sesión u otra página de autenticación
    }
  }, []);

  return (
    <main className="main-app">
      <BrowserRouter>
        <Menu />
        <div className="contenedor-app">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Registros />} />
            <Route path="/gr/gremios" element={<Gremios />} />
            <Route path="/gr/validar-registros" element={<ValidarRegistros />} />
            <Route path="/gr/comprobantes" element={<Comprobantes />} />
            <Route path="/gr/param/gremio" element={<Gremio />} />
            <Route path="/gr/param/categoria" element={<Categoria />} />
            <Route path="/gr/param/deporte" element={<Deporte />} />
            <Route path="/gr/param/carrera" element={<Carrera />} />
            <Route path="/gr/param/presidente" element={<Presiendente />} />
            <Route path="*" element={<p>Not Found</p>} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}

export default App;

// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css'
// import { Menu } from './componets/menu/Menu'
// import { Gremios } from './layauts/pages/gremios/Gremios'
// import { Login } from './layauts/pages/login/Login'
// import { Registros } from './layauts/pages/registros/Registros'
// import { ValidarRegistros } from './layauts/pages/validar-registros/ValidarRegistros'
// import { Comprobantes } from './layauts/pages/comprobantes/Comprobantes'
// import { Gremio } from './layauts/pages/parametros/gremio/Gremio'
// import { Categoria } from './layauts/pages/parametros/categoria/Categoria'
// import { Deporte } from './layauts/pages/parametros/deporte/Deporte'
// import { Carrera } from './layauts/pages/parametros/carrera/Carrera'
// import { Presiendente } from './layauts/pages/parametros/presidente/Presiendente'
// import { useEffect } from 'react'
// function App() {

//   const currentPath = window.location.pathname;
//   const isLoginPage = currentPath !== '/login';
 
  
//   useEffect(() => {
//     // Verificar si el usuario ya está autenticado
//     // Por ejemplo, podrías verificar si hay un token de autenticación en el almacenamiento local
//     const token = localStorage.getItem('token');
//     if (token) {
    
//       console.log(token)
//     }
//     //setLoggedIn(true);
//   }, []);
  
//   return (
//     <>
//     <main className='main-app'>
//     <BrowserRouter>

//     {isLoginPage && ( 
//             <div className="menu"> 
//               <Menu /> 
//             </div>
//           )}

//     <div className="contenedor-app">
//     <Routes>
//         <Route path="/login" element={ <Login />} />

//         <Route path="/" element={ <Registros />} />
//         <Route path="/gr/gremios" element={ <Gremios />} />
//         <Route path="/gr/validar-registros" element={<ValidarRegistros />} />
//         <Route path="/gr/comprobantes" element={ <Comprobantes />} />
//         <Route path="/gr/param/gremio" element={ <Gremio />} />
//         <Route path="/gr/param/categoria" element={ <Categoria />} />
//         <Route path="/gr/param/deporte" element={ <Deporte />} />
//         <Route path="/gr/param/carrera" element={ <Carrera />} />
//         <Route path="/gr/param/presidente" element={ <Presiendente />} />
//         <Route path='*' element={<p>not gound</p >} />
//     </Routes>

//     </div>
//     </BrowserRouter>

//     </main>
//     </>
//   )
// }

// export default App
