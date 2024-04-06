
import { useEffect, useState } from "react";
import "./registros.css"
import { RegistrarRepository } from "../../../data/registros/registrosRepositor";
import { IRegistrarPostulantes, RegistrosModel } from "../../../domain/registros/models/registrosModel";

export const Registros = () => {

  const registrarRepository = new RegistrarRepository();
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [idEquipo, setIdEquipo] = useState(0);
  const [idAdjuntos] = useState<number[]>([]);
  // const [cedulaPdf, setIdCedulaPdf] = useState([]);
  // const [planialPdf, setPlanialPdf] = useState([]);
  // const [certificadoPdf, setCertificadoPdf] = useState([]);
  // const [fotoPdf, setfotoPdf] = useState([]);
  const [equipos, setEquipos] = useState<RegistrosModel[]>([]);

  useEffect(() => {
    getAllEquipoPorUser();
  }, []);

  const getAllEquipoPorUser = () => {
    registrarRepository.getAllEquiposPorUser().then((res) => {
      if (res) {
        setEquipos(res);
      }
    });
  };


  const handleSubmit = async ( event : React.FormEvent ) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  
    const postulante: IRegistrarPostulantes = {
      nombres: nombres,
      apellidos: apellidos,
      cedula: cedula,
      email: email,
      idEquipo: idEquipo,
      idAdjuntos: idAdjuntos
    };
    console.log(postulante);
  
    if( postulante.nombres == "" || postulante.apellidos == "" || postulante.cedula == "" 
    || postulante.email == "" || postulante.idEquipo == 0){
      alert("Todos los campos son obligatorios");
      return;
    }
  
    const exito = await registrarRepository.RegistrarPostulantes(postulante);
    
    if (exito) {
      alert('El postulante se ha registrado correctamente.');
      window.location.reload();
      //getAllGremios();
    } else {
      alert('Error al registrar el gremio.');
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>, tipo: string) => {
    const file = event.target.files?.[0]; // Obtiene el archivo subido
    console.log(tipo);
    console.log(file);
  
    if (!file) {
      alert('No se ha seleccionado ninguño archivo.');
      return;
    }
    try {
      const archivoBase64 = await convertirBase64(file);
      console.log(archivoBase64);
  
      const adjunto = {
        nombreDocumento: file.name,
        dataBase64: archivoBase64
      };
      console.log(adjunto)
  
      // const result = await registrarRepository.SubirAdjunto(adjunto);
  
      // console.log(result)
      // if (result) {
      //   alert('El gremio se ha registrado correctamente.');
        
      //   // Utilizar una función de actualización de estado con callback para acceder al valor actualizado de idAdjuntos
      //   //setIdAdjuntos(prevIdAdjuntos => { [...prevIdAdjuntos, 1]
         
      //   });
      // } else {
      //   alert('Error al registrar el gremio.');
      // }
  
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
      alert('Error al procesar el archivo.');
    }
  }
  
  


  const convertirBase64 = async (archivo : File) => {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();
      lector.readAsDataURL(archivo);
      lector.onload = () => resolve(lector.result);
      lector.onerror = error => reject(error);
    });
  }

  
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
          <b>Crear Registros</b>
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
              {equipos.map((equipos) => (
                <option  value={equipos.idEquipo}>{equipos.nombreEquipo}</option>
              ))}
            </select>
          </div>



          <div className="titulo-documentos">Documentos</div>

          <div className="container-inputs">
            <label htmlFor="username">
              Cédula<span>(*)</span>{" "}
            </label>
            <input type="file" id="cedula" onChange={(event) => handleChange(event, "CEDULA") } accept=".pdf" />
            <span>Subir un documento .pdf. Tamaño Max. 2MB</span>
          </div>
          <div className="container-inputs">
            <label htmlFor="username">
              Planilla de luz<span>(*)</span>{" "}
            </label>
            <input type="file" id="luz" onChange={(event) => handleChange(event, "LUZ") } accept=".pdf" />
            <span>Subir un documento .pdf. Tamaño Max. 2MB</span>
          </div>
          <div className="container-inputs">
            <label htmlFor="username">
              Certificado laboral<span>(*)</span>{" "}
            </label>
            <input type="file" id="cert-laboral" onChange={(event) => handleChange(event, "CERTIFICADO") } accept=".pdf"/>
            <span>Subir un documento .pdf. Tamaño Max. 2MB</span>
          </div>
          <div className="container-inputs">
            <label htmlFor="username">
              Foto<span>(*)</span>{" "}
            </label>
            <input type="file" id="foto" onChange={(event) => handleChange(event, "FOTO") } accept="image/*"/>
            <span>Subir un documento .pdf. Tamaño Max. 2MB</span>
          </div>

          <div className="container-button">
            <button type="submit">Guardar Datos</button>
          </div>
        </form>
      </div>
    </div>
  );



}
