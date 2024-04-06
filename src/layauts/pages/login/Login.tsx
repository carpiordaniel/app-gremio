import { useEffect, useState } from "react";
import "./login.css";	
import { API_URL } from "../../../core/urls/gremioUrl"; 
import { useNavigate } from "react-router-dom";
// import { Gremio } from "../parametros/gremio/Gremio";
// import { Menu } from "../../../componets/menu/Menu";


export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos de inicio de sesión:', { email, password });
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log("dataaaaa",data)
      console.log(response)
      if (data.respuesta) {
        //const data = await response.json();
        localStorage.setItem("token", data.resultado.token);
        console.log("Inició sesión correctamente");
        //setLoggedIn(true);
        navigate("/", { replace: true }); 
        window.location.reload();
        // Navegar a la página principal
      } else {
        if(data.mensaje == 'Password incorrecta' || data.mensaje == 'El usuario no existe en el sistema'){	
          setError("Credenciales incorrectas");
          console.log("", data.mensaje);
          return;
        }
        alert(data.mensaje);	
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }
  };

  useEffect(() => {
    const container = document.querySelector('.main-app');
    if (container) {
      container.classList.add("form-in");
    }
  }, []);

  return (
    <div className="container-login" id="login">
      <div className="contenido">
        <div className="imagen">
          <img src="sftp://217.196.50.138/var/www/html/img/login.png" alt="login img"/>
        </div>
        <div className="login-container">
          <h2>Iniciar Sesión</h2>
          <form className="login" onSubmit={handleSubmit}>
            <div className="">
              <input 
                className="email" 
                type="text" 
                id="email" 
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email" />
            </div>
            <div className="">
              <input 
                type="password" 
                id="password" 
                name="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Contraseña" />
            </div>
            {/* Mostrar mensaje de error si hay uno */}
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};





