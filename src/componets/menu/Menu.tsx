import { Link, useLocation  } from "react-router-dom";
import './menu.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";
export interface dataResponse {
  email: string,
  nombre: string,
  rol: string,
  userName: string 
}
export const Menu = () => {
  const currentPath = useLocation().pathname;
  const [data, setData] = useState<dataResponse>({} as dataResponse);
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('data') || '{}'))
    
  }, []);

  if (currentPath === '/login') {
    return null; 
  }

  const logout = () => {
    localStorage.removeItem('data');
    window.location.href = './login';
  }
  return (
    
  <div className="contenido-menu">
    <div className="menu-container">
      <p className="facturacion">Gremios</p>
      <ul>
          <li><Link to="/"  > 📁 Registros </Link></li>
          <li><Link to="/gr/gremios" > 🗃️ Gremios </Link></li>
          <li> <Link to="/gr/validar-registros" >✅ Validar registros</Link></li>
          {/* <li><Link to="/gr/comprobantes" >📋 Comprobantes </Link></li> */}

          <div id="summary">
            <details >
              <summary ><span className="abajo"><KeyboardArrowDownIcon/> </span> Comprobantes <span className="derecha"><ChevronRightIcon/></span> </summary>
              <ul>
                <li><Link to="/gr/comprobantes/subir"> Subir Comprobante</Link></li>
                <li><Link to="/gr/comprobantes/validar">Valida commprobante</Link></li>
                
              </ul>
            </details>
          </div>
          

          <div id="summary">
            <details >
              <summary ><span className="abajo"><KeyboardArrowDownIcon/> </span> Parametros  <span className="derecha"><ChevronRightIcon/></span> </summary>
              <ul>
                <li><Link to="/gr/param/gremio"> Gremio</Link></li>
                <li><Link to="/gr/param/categoria">Categoría</Link></li>
                <li><Link to="/gr/param/deporte" >Deporte</Link></li>
                <li><Link to="/gr/param/carrera">Carrera</Link></li>
                <li><Link to="/gr/param/presidente">Presidente</Link></li>
              </ul>
            </details>
          </div>


      </ul>
    </div>


    <div>
      <div className="profile">
        <div className="profile-container">
        <hr />
        <p> PERFIL </p>
        <hr/>
        </div>
        <div className="profile-data">

        <AccountCircleIcon/>
        <div>
          <p > {data?.nombre ? data?.nombre.toLocaleUpperCase(): ''}</p>
          <p > {data?.rol ? data?.rol: ''}</p>
          </div>
        </div>
      </div>
      <button className="salir"  onClick={logout}><LogoutIcon/> Salir</button> 

    </div>
    
    </div>


  )
}


