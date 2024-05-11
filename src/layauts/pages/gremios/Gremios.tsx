import { useEffect, useState } from "react";
import { ITEM_PER_PAGE } from "../../../core/urls/gremioUrl";
import Pagination from "../../../componets/pagination/Pagination";


export const Gremios = () => {
  
  const [gremios, setGremios] = useState([{ id: 0, nombreEquipo: '', presidente: "", deporte: "", gremio: "", categoria: "", carrera: "" }]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = ITEM_PER_PAGE; 
  const pagesVisited = pageNumber * itemsPerPage;

  const [nombreEquipo, setNombreEquipo] = useState('');
  const [idPresidente, setIdPresidente] = useState(0);
  const [idDeporte, setIdDeporte] = useState(0);
  const [idGremio, setIdGremio] = useState(0);
  const [idCategoria, setIdCategoria] = useState(0);
  const [idCarrera, setIdCarrera] = useState(0);


  const [deportes, setDeporte] = useState([{ id: 0, nombre: 'Deporte' }]);
  const [gremio, setGremio] = useState([{ id: 0, nombre: 'Gremio' }]);
  const [categoria, setCategoria] = useState([{ id: 0, nombre: 'Categoría' }]);
  const [carrera, setCarrera] = useState([{ id: 0, nombre: 'Carrera' }]);
  const [presidentes, setPresidentes] = useState([{ id: 0, nombre: 'Presidente' }]);

  useEffect(() => {
    getAllGremios();
    getAllParametros();
  }, []);

  const getAllParametros = () => {
    setPresidentes([{ id: 1, nombre: 'Nombre Presidente' }]);
    setDeporte([{ id: 1, nombre: 'Nombre Deporte' }]);
    setGremio([{ id: 1, nombre: 'Nombre Gremio' }]);
    setCategoria([{ id: 1, nombre: 'Nombre Categoría' }]);
    setCarrera([{ id: 1, nombre: 'Nombre Carrera' }]);
  };


  const getAllGremios = () => {
    setGremios([{ id: 0, nombreEquipo: 'Nombre equipo', presidente: 'Presidente', deporte: 'Deporte', gremio: 'Gremio', categoria: 'Categoria', carrera: 'Carrera' }]);
  };

  const eliminarGremio = () =>{
  }
  

  const tablaFinal = gremios
  .slice(pagesVisited, pagesVisited + itemsPerPage)
  .map((item, index) => (
    <tr key={index}>
      <td>{item.nombreEquipo}</td>
      <td>{item.presidente}</td>
      <td>{item.deporte}</td>
      <td>{item.gremio}</td>
      <td>{item.categoria}</td>
      <td>{item.carrera}</td>
      <td className="eliminar">
      <button onClick={() =>eliminarGremio()}>❌</button>
      </td>
    </tr>
  ));

const pageCount = Math.ceil(gremios.length / itemsPerPage);
const changePage = ({ selected }: { selected: number }) => {
  setPageNumber(selected);
};

const handleSubmit = async ( event : React.FormEvent ) => {
  event.preventDefault(); 
};

  return (
    <div>
      <div className="content">
        <div className="barra-tutilo">
          <p>
            <b>Importante:</b> para guardar debe ingresar todos los campos
            obligatorios (*)
          </p>
        </div>

        <div className="titulo">
          <p>
            <b>Crear Gremios (Equipos)</b>
          </p>
        </div>
        <div className="container-form">
          <form action="" className="login" onSubmit={handleSubmit}>
            <div className="container-inputs">
              <label htmlFor="nombreEquipo">
                Nombre gremio (equipo)<span>(*)</span>{" "}
              </label>
              <input
                className="username"
                type="text"
                id="nombreEquipo"
                placeholder="Nombre gremio (equipo)"
                value={nombreEquipo}
                onChange={(e) => setNombreEquipo(e.target.value)}
                required
              />
            </div>

            <div className="container-inputs">
              <label htmlFor="idPresidente">
                Presidente <span>(*)</span>{" "}
              </label>
              <select 
                name="idPresidente" 
              id="idPresidente"
              value={idPresidente}
              onChange={(e) => setIdPresidente(parseInt(e.target.value))}
              required
              key={idPresidente} >
              <option value={0}>Seleccione una opción...</option>
            {presidentes.map((presidentes) => (
              <option  value={presidentes.id}>{presidentes.nombre}</option>
            ))}
              </select>
            </div>
          

            <div className="container-inputs">
              <label htmlFor="idDeporte">
                Deportes <span>(*)</span>{" "}
              </label>
              <select name="idDeporte" 
                id="idDeporte"
                value={idDeporte}
                onChange={(e) =>setIdDeporte(parseInt(e.target.value))} 
                required
                key={idDeporte} >
                  <option value={0}>Seleccione una opción...</option>
                {deportes.map((deporte) => (
                  <option  value={deporte.id}>{deporte.nombre}</option>
                ))}

              </select>
            </div>

            <div className="container-inputs">
              <label htmlFor="idGremio">
                Gremio <span>(*)</span>{" "}
              </label>
              <select name="idGremio" 
                id="idGremio"
                value={idGremio}
                onChange={(e) => setIdGremio(parseInt(e.target.value))}
                required
                key={idGremio} >
                  <option value={0}>Seleccione una opción...</option>
                {gremio.map((gremio) => (
                  <option  value={gremio.id}>{gremio.nombre}</option>
                ))}
              </select>
            </div>


            <div className="container-inputs">
              <label htmlFor="username">
                Categoría <span>(*)</span>{" "}
              </label>
              <select name="idCategoria" 
                id="idCategoria"
                value={idCategoria}
                onChange={(e) => setIdCategoria(parseInt(e.target.value))}
                required
                key={idCategoria} >
                  <option value={0}>Seleccione una opción...</option>
                {categoria.map((categoria) => (
                  <option  value={categoria.id}>{categoria.nombre}</option>
                ))}
              </select>
            </div>


            <div className="container-inputs">
              <label htmlFor="username">
                Carrea <span>(*)</span>{" "}
              </label>
              <select name="idCarrera" 
                id="idCarrera"
                value={idCarrera}
                onChange={(e) => setIdCarrera(parseInt(e.target.value))}
                required
                key={idCarrera} >
                  <option value={0}>Seleccione una opción...</option>
                {carrera.map((carrera) => (
                  <option  value={carrera.id}>{carrera.nombre}</option>
                ))}
              </select>
            </div>


            <div className="container-button">
              <button type="submit">Guardar Datos</button>
            </div>
          </form>
        </div>
      </div>

      <div className="table-container">
        <div className="buscar">
          <label htmlFor="">Buscar: </label>
          <input type="text" placeholder="Buscar por nombre o usuario" />
        </div>

        <div className="separador">
          <div>
            <table>
              <thead>
                <tr>
                  <th>Nombre equipo</th>
                  <th>Presidente</th>
                  <th>Deporte</th>
                  <th>Gremio</th>
                  <th>Categoria</th>
                  <th>Carreras</th>
                  <th className="eliminar">Acciones</th>
                </tr>
              </thead>

              <tbody>{tablaFinal}</tbody>
            </table>
          </div>
          <Pagination pageCount={pageCount} onPageChange={changePage} />

        </div>
      </div>
    </div>
  );
}
