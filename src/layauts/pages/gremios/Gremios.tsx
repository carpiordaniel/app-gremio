import { useEffect, useState } from "react";
import { ITEM_PER_PAGE } from "../../../core/urls/gremioUrl";
import Pagination from "../../../componets/pagination/Pagination";
import { GremiosRepository } from "../../../data/gremios/gremiosRepository";
import { GremiosModel } from "../../../domain/gremios/models/gremiosModel";
import { GremioModel } from "../../../domain/parametros/gremio/models/gremioModel";
import { CategoriaRepository } from "../../../data/parametros/categoria/categoriaRepository";
import { DeporteRepository } from "../../../data/parametros/deporte/deporteRepository";
import { GremioRepository } from "../../../data/parametros/gremio/gremioRepository";
import { CarreraRepository } from "../../../data/parametros/carrera/carreraRepository";
import { PresidenteRepository } from "../../../data/parametros/presidente/presidenteRepository";
import { PresidenteModel } from "../../../domain/parametros/presidente/models/presidenteModel";

export const Gremios = () => {

  const gremiosRepository = new GremiosRepository();
  
  const [gremios, setGremios] = useState<GremiosModel[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = ITEM_PER_PAGE; 
  const pagesVisited = pageNumber * itemsPerPage;

  const [nombreEquipo, setNombreEquipo] = useState('');
  const [idPresidente, setIdPresidente] = useState(0);
  const [idDeporte, setIdDeporte] = useState(0);
  const [idGremio, setIdGremio] = useState(0);
  const [idCategoria, setIdCategoria] = useState(0);
  const [idCarrera, setIdCarrera] = useState(0);


  const deportesRepository = new DeporteRepository();
  const [deportes, setDeporte] = useState<GremioModel[]>([]);
  const gremioRepository = new GremioRepository();
  const [gremio, setGremio] = useState<GremioModel[]>([]);
  const categoriaRepository = new CategoriaRepository();
  const [categoria, setCategoria] = useState<GremioModel[]>([]);
  const carreraRepository = new CarreraRepository();
  const [carrera, setCarrera] = useState<GremioModel[]>([]);
  const presidenteRepository = new PresidenteRepository();
  const [presidentes, setPresidentes] = useState<PresidenteModel[]>([]);

  useEffect(() => {
    getAllGremios();
    getAllParametros();
  }, []);

  const getAllParametros = () => {
    deportesRepository.getAllDeporte().then((res) => { if (res) { setDeporte(res);} });
    gremioRepository.getAllGremio().then((res) => { if (res) { setGremio(res);} });
    categoriaRepository.getAllCategoria().then((res) => { if (res) { setCategoria(res);} });
    carreraRepository.getAllCarrera().then((res) => { if (res) { setCarrera(res);} });
    presidenteRepository.getAllPresidentes().then((res) => { if (res) { setPresidentes(res);} });
  };


  const getAllGremios = () => {
    gremiosRepository.getAllGremios().then((res) => {
      if (res) {
        setGremios(res);
      }
      console.log(res)
    });
    console.log(gremios)
  };
  

  const tablaFinal = gremios
  .slice(pagesVisited, pagesVisited + itemsPerPage)
  .map((item) => (
    <tr key={item.nombreEquipo}>
      <td>{item.nombreEquipo}</td>
      <td>{item.presidente}</td>
      <td>{item.deporte}</td>
      <td>{item.gremio}</td>
      <td>{item.categoria}</td>
      <td>{item.carrera}</td>
  
      <td className="eliminar">
      <button>❌</button>
      </td>
    </tr>
  ));

const pageCount = Math.ceil(gremios.length / itemsPerPage);
const changePage = ({ selected }: { selected: number }) => {
  setPageNumber(selected);
};


const handleSubmit = async ( event : React.FormEvent ) => {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

  const gremio = {
    nombreEquipo: nombreEquipo,
    idDeporte: idDeporte,
    idGremio: idGremio,
    idCategoria: idCategoria,
    idCarrera: idCarrera,
    idPresidente: idPresidente

  };

  if (!nombreEquipo) {
    alert("El nombre del equipo no puede estar vacío");
    return;
  }
  
  if (idDeporte === 0 || idGremio === 0 || idCategoria === 0 || idCarrera === 0 || idPresidente === 0) {
    alert("Debe seleccionar una opción válida para todos los campos");
    return;
  }
  

  console.log(gremio);
  const exito = await gremiosRepository.RegistrarGremios(gremio);
  
  if (exito) {
    alert('El gremio se ha registrado correctamente.');
    getAllGremios();
  } else {
    alert('Error al registrar el gremio.');
  }
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
              <option  value={presidentes.idUser}>{presidentes.nombre}</option>
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
                  <option  value={deporte.codigoCatalogo}>{deporte.nombre}</option>
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
                  <option  value={gremio.codigoCatalogo}>{gremio.nombre}</option>
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
                  <option  value={categoria.codigoCatalogo}>{categoria.nombre}</option>
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
                  <option  value={carrera.codigoCatalogo}>{carrera.nombre}</option>
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
              {/* <tbody>
                <tr>
                  <td> equipo.nombreEquipo </td>
                  <td>equipo.presidente </td>
                  <td> equipo.deporte </td>
                  <td> equipo.gremio </td>
                  <td> equipo.categoria </td>
                  <td> equipo.carrera </td>
                  <td className="eliminar">
                    <button>❌</button>
                  </td>
                </tr>
              </tbody> */}
            </table>
          </div>
          <Pagination pageCount={pageCount} onPageChange={changePage} />

        </div>
      </div>
    </div>
  );
}
