import { useEffect, useState } from 'react'
import Pagination from '../../../componets/pagination/Pagination';
import { ITEM_PER_PAGE } from '../../../core/urls/gremioUrl';
import { ValidarRegistrosRepository } from '../../../data/validar-registros/validarRegistrosRepository';
import { validarRegistroModel } from '../../../domain/validar-registros/models/validarRegistroModel';

export const ValidarRegistros = () => {

  const validarRegistrosRepository = new ValidarRegistrosRepository();
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = ITEM_PER_PAGE; 
  const pagesVisited = pageNumber * itemsPerPage;

  const [postulantes, setPostulantes] = useState<validarRegistroModel[]>([]);



  useEffect(() => {
    getAllPostulantes();
  }, []);


  const getAllPostulantes = () => {
    validarRegistrosRepository.getAllPostulantes().then((res) => {
      if (res) {
        setPostulantes(res);
      }
      console.log(res)
    });
    console.log(postulantes)
  };


  const tablaFinal = postulantes
  .slice(pagesVisited, pagesVisited + itemsPerPage)
  .map((item) => (
    <tr key={item.email}>
      <td>{item.nombres}</td>
      <td>{item.apellidos}</td>
      <td>{item.cedula}</td>
      <td>{item.email}</td>
      <td>{item.deporte}</td>
     
  
      <td className="eliminar">
      <button>❌</button>
      </td>
    </tr>
  ));

  const pageCount = Math.ceil(postulantes.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
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
          <b>Lista de portulantes</b>
        </p>
      </div>
      <div className="container-form">
        {/* <form action="" className="login" onSubmit={handleSubmit}>
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
            required>
              <option value={0}>Seleccione una opción...</option>
              <option value="1">Presidente.nombre</option>
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
        </form> */}
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
