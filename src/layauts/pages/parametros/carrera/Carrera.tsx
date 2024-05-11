import React, { useEffect, useState } from 'react'
import Pagination from '../../../../componets/pagination/Pagination';
import { ITEM_PER_PAGE } from '../../../../core/urls/gremioUrl';

export const Carrera = () => {
  
  const [carreras, setCarreras] = useState([ { codigoCatalogo: 1, nombre: 'Carreras', descripcion: 'Carrera', idTipoParametroResp: 'carreras', fechaCreacion: '2022-01-01', fechaActualizacion: '2022-01-01' } ]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = ITEM_PER_PAGE; 
  const pagesVisited = pageNumber * itemsPerPage;

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('true');

  
  useEffect(() => {
    getAllCarreras();
  }, []);

  const getAllCarreras = () => {
    setCarreras([{ codigoCatalogo: 1, nombre: 'Carreras', descripcion: 'Carrera', idTipoParametroResp: 'carreras', fechaCreacion: '2022-01-01', fechaActualizacion: '2022-01-01' }]);
  };
  
  const deleteGremio = () => {
  }

  const tablaFinal = carreras
  .slice(pagesVisited, pagesVisited + itemsPerPage)
  .map((item) => (
    <tr key={item.codigoCatalogo}>
      <td>{item.codigoCatalogo}</td>
      <td>{item.nombre}</td>
      <td>{item.descripcion}</td>
      <td>{item.idTipoParametroResp}</td>
      <td>{item.fechaCreacion.substring(0, 10)}</td>
      <td>{item.fechaActualizacion.substring(0, 10)}</td>
      <td className="eliminar">
      <button onClick={() => deleteGremio()}>❌</button>
      </td>
    </tr>
  ));

const pageCount = Math.ceil(carreras.length / itemsPerPage);
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
            <b>Crear Deporte</b>
          </p>
        </div>
        <div className="container-form">
        <form className="" onSubmit={handleSubmit}>
              <div className="container-inputs">
                <label htmlFor="username">
                  Nombre <span>(*)</span>
                </label>
                <input
                  className="username"
                  type="text"
                  id="username"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="container-inputs">
                <label htmlFor="password">
                  Nombre descripción<span>(*)</span>
                </label>
                <input 
                  type="text" 
                  id="password" 
                  placeholder="Descripcion" 
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                  />
              </div>

              <div className="container-inputs">
                <label htmlFor="estado">
                  Estado <span>(*)</span>
                </label>
                <select name="" id="estado"
                value={ estado }
                onChange={(e) => setEstado(e.target.value === 'true' ? 'true' : 'false')}
                required
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
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
          {/* <input type="text" (keyup)="buscar($event)"> */}
          <input type="text" />
        </div>

        <div className="separador">
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Tipo Parametro</th>
                <th>Fecha Creacion</th>
                <th>Fecha Actualizacion</th>
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
  )
}
