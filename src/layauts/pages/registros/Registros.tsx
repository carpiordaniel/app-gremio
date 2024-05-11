
import { useEffect, useState } from "react";
import "./registros.css";


export const Registros = () => {

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [idEquipo, setIdEquipo] = useState(0);
  const [equipos, setIdEquipos] = useState([{ idEquipo: 0, nombreEquipo: "" }]);

  useEffect(() => {
    getAllEquipoPorUser();
  }, []);

  const getAllEquipoPorUser = () => {
    setIdEquipos([
      { idEquipo: 1, nombreEquipo: "Equipo 1" },
      { idEquipo: 2, nombreEquipo: "Equipo 2" },
    ]);
  };


  const handleSubmit = async ( event : React.FormEvent ) => {
    event.preventDefault(); 
  };
  
  return (
    
    <div className="content">
      
      <div className="barra-tutilo">
        <p>
          <b>Importante:</b> para guardar debe ingresar todos los campos
          obligatorios (*)
        </p>
      </div>

      <div className="titulo">
        <p>
          <b>Crear Registros Jugador</b>
        </p>
      </div>
      <div className="container-form">
        <form action="" className="login" onSubmit={handleSubmit}>
          <div className="container-inputs">
            <label htmlFor="username">
              Nombres<span>(*)</span>{" "}
            </label>
            <input
              className="username"
              type="text"
              id="username"
              placeholder="Nombres"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              required
            />
          </div>

          <div className="container-inputs">
            <label htmlFor="username">
              Apellidos<span>(*)</span>{" "}
            </label>
            <input
              className="username"
              type="text"
              id="username"
              placeholder="Apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />
          </div>

          <div className="container-inputs">
            <label htmlFor="username">
              N° Cédula<span>(*)</span>{" "}
            </label>
            <input type="text" 
            id="password" 
            placeholder="N° Cédula" 
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
            />
          </div>

          <div className="container-inputs">
            <label htmlFor="username">
              Correo electrónico<span>(*)</span>{" "}
            </label>
            <input type="text" id="password" 
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          </div>

          <div className="container-inputs">
            <label htmlFor="username">
              Gremio (Equipo) <span>(*)</span>{" "}
            </label>
            <select name="equipos" id="equipos"
              value={idEquipo}
              onChange={(e) =>setIdEquipo(parseInt(e.target.value))} 
              required
              key={idEquipo} >
                <option value={0}>Seleccione una opción...</option>
                {equipos.map((equipo) => (
                  <option key={equipo.idEquipo} value={equipo.idEquipo} >{equipo.nombreEquipo}</option>
                ))}
                {/* <option  value="" >Real Madrid FC</option> */}
            </select>
          </div>

          <div className="container-button">
            <button type="submit">Guardar Datos</button>
          </div>
        </form>
      </div>
    </div>
  );



}
