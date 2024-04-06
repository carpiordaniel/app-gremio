import { useEffect, useState } from "react";
import "./login.css";	
import { API_URL } from "../../../core/urls/gremioUrl"; 
import { useNavigate } from "react-router-dom";
// import { Gremio } from "../parametros/gremio/Gremio";
// import { Menu } from "../../../componets/menu/Menu";


export const Login = () => {

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    
      "email": "x@gmail.com",
      "password":"12345"
  
    // perfil: '',
  });

  console.log(loggedIn)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para validar las credenciales y manejar el inicio de sesión
    console.log('Datos de inicio de sesión:', formData);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("token", data.resultado.token);
        console.log("hay que hacer el nav")
        setLoggedIn(true);
        if(data.resultado.token){ 
          navigate("/gr", {replace: true}); 
          //window.location.reload();
        }
        console.log(data)
        
      } else {
        // Si la respuesta no es exitosa, manejar el error
        console.error('Error al iniciar sesión');
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
  }, [])



  return (
    <div className="container-login" id="login">

    <div className="contenido">
      <div className="imagen">
        <img src="src\assets\login.png" alt="login img"/>
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
              value={formData.email}
              onChange={handleChange}
              placeholder="Email" />
          </div>
          <div className="">

            <input 
              type="password" 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña" />
          </div>
          {/* <div className="">
            <select 
              name=""
              // value={formData.email}
              onChange={handleChange} 
              id="">
              <option >Selecciona perfil...</option>
              <option value="1">Presidente</option>
              <option value="2">Secretaria gremio</option>
              <option value="3">Secretaria general</option>
            </select>
          </div> */}
        
          <button type="submit" >Iniciar Sesión</button>
        </form>
      </div>
    </div>

   
    </div>







  )
}
