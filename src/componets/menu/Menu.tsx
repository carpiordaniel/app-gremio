import { Link, useLocation  } from "react-router-dom";
import './menu.css'

export const Menu = () => {
  const currentPath = useLocation().pathname;

  if (currentPath === '/') {
    return null; // No renderiza el menú si estamos en la página de inicio de sesión
  }
  return (
    
  <div className="contenido-menu">
    <div className="menu-container">
      <p className="facturacion">Gremios</p>
      <ul>
          <li><Link to="/gr"  > 📁 Registros </Link></li>
          <li><Link to="/gr/gremios" > 🗃️ Gremios </Link></li>
          <li> <Link to="/gr/validar-registros" >✅ Validar registros</Link></li>
          <li><Link to="/gr/comprobantes" >📋 Comprobantes </Link></li>

          <div id="summary">
            <details >
              <summary >Parametros <span className="abajo">🡫</span> <span className="derecha">🡪</span> </summary>
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

    <Link to={"/"} className="salir" >✖️ Salir</Link> 
    
    </div>


  )
}


