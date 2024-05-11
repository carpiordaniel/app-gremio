
import { Box } from '@mui/joy';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Pagination from '../../../componets/pagination/Pagination';
import { useEffect, useState } from 'react';


export const ValidarComprobantes = () => {
  const [pageNumber, setPageNumber] = useState(0);
 
  const [comprobantes, setComprobantes] = useState([ { idAdjunto: 0, nombreAdjunto: '', url: '', encargado: '', estadoAdjunto: '' }]);
  const itemsPerPage = 10; 
  const pagesVisited = pageNumber * itemsPerPage;
  
  const pageCount = Math.ceil(comprobantes?.length == null ? 0 : comprobantes?.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };
  useEffect(() => {
    getAllComprobantes();
  }, []);

  const getAllComprobantes = () => {
    setComprobantes([{ idAdjunto: 1, nombreAdjunto: 'Comprobantes de pagos', url: 'https://www.orimi.com/pdf-test.pdf', encargado: 'Encargado de comprobantes', estadoAdjunto: 'PENDIENTE', },]);
  };

  const handleChange = () => {
  };

  const aprobarComprobante = () => {
 
  }

  const tablaFinal = comprobantes
  .slice(pagesVisited, pagesVisited + itemsPerPage)
  .map((item) => (
    <tr key={item.idAdjunto}>
      <td>{item.nombreAdjunto.toUpperCase()}</td>
      <td className='url-doc-comprobantes'> <a href={item.url}  target="_blank" rel="noopener noreferrer" >{item.nombreAdjunto.toLocaleLowerCase()}</a> </td>
      <td>{item.encargado ? item.encargado.toLocaleUpperCase() : ''}</td>
      <td>
      <select 
        className='select-comprobantes'
        name={item.idAdjunto.toString()} id={item.idAdjunto.toString()}
        value={item.estadoAdjunto == "PENDIENTE" ? "PENDIENTE" : 
        item.estadoAdjunto == "RECHAZADO" ? "RECHAZADO" : "APROBADO"
        }
        onChange={() => handleChange()} 
        >
          <option value="PENDIENTE">Pendiente</option>
          <option value="APROBADO">Aprobado</option>
          <option value="RECHAZADO">Rechazado</option>
      </select>
     
      </td>
      <td className="">
      <SaveIcon onClick={() => aprobarComprobante()} />
      <DeleteForeverIcon sx={{color: '#d11414'}} />     
      </td>
    </tr>
  ));


  return (
    <>
       
    <Box>
      
    <div className="table-container">
        <div className="buscar">
          <label htmlFor="">Buscar: </label>
          <input type="text" />
        </div>

        <div className="separador">
        <div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Encargado</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody >{tablaFinal}</tbody>
          </table>
          </div>
          <Pagination pageCount={pageCount} onPageChange={changePage} />
        </div>
      </div>

    </Box>
    </>
  )
}



