import { useEffect, useState } from 'react'
import Pagination from '../../../componets/pagination/Pagination';
import { ITEM_PER_PAGE } from '../../../core/urls/gremioUrl';
import './ValidarRegistros.css'
import SaveIcon from '@mui/icons-material/Save';

export const ValidarRegistros = () => {

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = ITEM_PER_PAGE; 
  const pagesVisited = pageNumber * itemsPerPage;
  const [postulantes, setPostulantes] = useState([{ idPostulante: 0, nombres: '', apellidos: '', cedula: '', email: '', deporte: '', estadoPostulante: '' } ]);


  useEffect(() => {
    getAllPostulantes();
  }, []);


  const getAllPostulantes = () => {
    setPostulantes([{ idPostulante: 1, nombres: 'prueba', apellidos: 'prueba', cedula: 'prueba', email: 'prueba', deporte: 'prueba', estadoPostulante: 'PENDIENTE' }]);
  };


  const handleChange = () => {
    
  };

  const aprobarComprobante = () => {
  }

  const tablaFinal = postulantes
  .slice(pagesVisited, pagesVisited + itemsPerPage)
  .map((item) => (
    <tr key={item.idPostulante}>
      <td>{item.idPostulante}</td>
      <td>{item.nombres}</td>
      <td>{item.apellidos}</td>
      <td>{item.cedula}</td>
      <td>{item.email}</td>
      <td>{item.deporte}</td>
  
      <td>
      <select 
        className={`estado-comprobante`}
        name={item.idPostulante.toString()} 
        id={item.idPostulante.toString()}
        value={item.estadoPostulante}
        onChange={() => handleChange()}
        >
          <option value="PENDIENTE">Pendiente</option>
          <option value="APROBADO">Aprobado</option>
          <option value="RECHAZADO">Rechazado</option>
      </select>
     
      </td>

  
      <td className="eliminar">
      <button>❌</button>
      <SaveIcon onClick={() => aprobarComprobante()} sx={{color: '#747474'}} />

      </td>
    </tr>
  ));

  const pageCount = Math.ceil(postulantes.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  
  return (
    <>
    <div className="content">
      <div className="barra-tutilo">
        <p>
          <b>Importante:</b> dele clic en el botón guardar para aprobar/rechazar (*)
        </p>
      </div>

      <div className="titulo">
        <p>
          <b>Lista de portulantes</b>
        </p>
      </div>
      
    </div>
    <div className='container-val-registro'>
      


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
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Cedula</th>
                <th>Emial</th>
                <th>Deporte</th>
                <th>Estado</th>
               
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
  </>
);
  
}


