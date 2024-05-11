import { useEffect, useState } from "react";
import "./login.css";	
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("daniel@gmail.com");
  const [password, setPassword] = useState("12345");

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      navigate("/", { replace: true });
    }
  })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const data = {
          email,
          password,
          nombre: "Daniel Carpio",
          rol: "Capitán de equipo",
        }
        localStorage.setItem("data", JSON.stringify(data));
        window.location.href = "/"; 
        
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }
  };



  return (
    <div className="container-login" id="login">
      <div className="contenido">
        <div className="imagen">
          <img src="./../../../../src/assets/login.png" alt="login img"/>
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
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};





