import Button from '@mui/joy/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, styled } from '@mui/joy';
import SaveIcon from '@mui/icons-material/Save';
import Pagination from '../../../componets/pagination/Pagination';
import { useEffect, useState } from 'react';
import { ITEM_PER_PAGE } from '../login/gremioUrl';
import "./comprobante.css"



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const Comprobantes = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const [comprobantes, setComprobantes] = useState([{ idAdjunto: 0, nombreAdjunto: '', url: '', estadoAdjunto: '' }]);

  const itemsPerPage = ITEM_PER_PAGE; 
  const pagesVisited = pageNumber * itemsPerPage;
  
  const pageCount = Math.ceil(comprobantes?.length == null ? 0 : comprobantes?.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };
  useEffect(() => {
    getAllComprobantes();
  }, []);

  const getAllComprobantes = () => {
    setComprobantes([{ idAdjunto: 1, nombreAdjunto: 'Comprobantes de pagos', url: 'https://www.orimi.com/pdf-test.pdf', estadoAdjunto: 'PENDIENTE', },]);
  };

  const subirComprobantes = () => {
  }

  const manejarCambioArchivo = async () => {
  }




  const tablaFinal = comprobantes
  .slice(pagesVisited, pagesVisited + itemsPerPage)
  .map((item) => (
    <tr key={item.idAdjunto}>
      <td>{item.nombreAdjunto.toUpperCase()}</td>
      <td>{item.estadoAdjunto.toLocaleLowerCase()}</td>
      <td className='url-doc-comprobantes'>
        <a href={item.url}  target="_blank" rel="noopener noreferrer" >{item.nombreAdjunto.toLocaleLowerCase()}</a> 
      </td>
   
      <td className="eliminar">
      <button>❌</button>
      </td>
    </tr>
  ));



  
  return (
    <>
    <Box className='container-val-registro'>
  
      <Button
        className='btn-subir-comprobantes'
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="plain"
        color="neutral"
        startDecorator={<CloudUploadIcon/>}
        >
        Upload a file
        <VisuallyHiddenInput   type="file" onChange={manejarCambioArchivo} />
      </Button>

      <Button className='btn-guardar' onClick={subirComprobantes} variant="solid" startDecorator={<SaveIcon />}>
        Guardar
      </Button>
    </Box>  

    
    <Box>
      
    <div className="table-container">
        <div className="separador">
        <div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Ver</th>
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



