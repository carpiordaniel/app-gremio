import React, { useEffect, useState } from 'react'
import Pagination from '../../../../componets/pagination/Pagination';
import { ITEM_PER_PAGE } from '../../../../core/urls/gremioUrl';
import { PresidenteRepository } from '../../../../data/parametros/presidente/presidenteRepository';
import { PresidenteModel } from '../../../../domain/parametros/presidente/models/presidenteModel';

export const Presiendente = () => {
  const presidenteRepository = new PresidenteRepository();
  const [presidentes, setIdPresidentes] = useState<PresidenteModel[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = ITEM_PER_PAGE; 
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(presidentes.length / itemsPerPage);
  
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getAllPresidentes();

  }, []);

  const getAllPresidentes = () => {
    presidenteRepository.getAllPresidentes().then((res) => {
      if (res) {
        setIdPresidentes(res);
      }
      console.log(res)
    });
    console.log(presidentes)
  };


  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

console.log(presidentes)
  
  const tablaFinal = presidentes
  .slice(pagesVisited, pagesVisited + itemsPerPage)
  .map((item) => (
    <tr key={item.idUser}>
      <td>{item.idUser}</td>
      <td>{item.nombre}</td>
      {/* <td>{item.deporte}</td>
      <td>{item.gremio}</td>
      <td>{item.categoria}</td>
      <td>{item.carrera}</td> */}
  
      <td className="eliminar">
      <button>❌</button>
      </td>
    </tr>
  ));


  const handleSubmit = async ( event : React.FormEvent ) => {
    event.preventDefault(); 
    
    const presidente = {
      email: email,
      nombre: nombre,
      username: username,
      password: password,
  
    };

    if( presidente.email == "" || presidente.nombre == "" || presidente.username == "" 
    || presidente.password == ""){
      alert("Todos los campos son obligatorios");
      return;
    }

    console.log(presidente)
    const exito = await presidenteRepository.RegistrarPresidente(presidente);
    if (exito) {
      alert('El presidente se ha registrado correctamente.');
      getAllPresidentes();
    } else {
      alert('Error al registrar el presidente.');
    }
    

  }
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
            <b>Crear presidente</b>
          </p>
        </div>
        <div className="container-form">
          <form className="" onSubmit={handleSubmit}>

          <div className="container-inputs">
              <label htmlFor="email">
                Email<span>(*)</span>
              </label>
              <input type="email" id="email" placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
            </div>

            <div className="container-inputs">
              <label htmlFor="nombre">
                Nombre <span>(*)</span>
              </label>
              <input
                className="nombre"
                type="text"
                id="nombre"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="container-inputs">
              <label htmlFor="username">
                Username <span>(*)</span>
              </label>
              <input
                className="username"
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>


            

            <div className="container-inputs">
              <label htmlFor="password">
                Contraseña<span>(*)</span>
              </label>
              <input type="text" id="password" placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
               />
            </div>

            <div className="container-inputs">
              <label htmlFor="estado">
                Estado <span>(*)</span>
              </label>
              <select name="" id="estado">
                <option value="true">Activo</option>
                {/* <option value="false">Inactivo</option> */}
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
                  {/* <th>Descripcion</th>
                  <th>Estado</th>
                  <th>Fecha Actualizacion</th>
                  <th>Fecha Creacion</th> */}
                  <th className="eliminar">Acciones</th>
                </tr>
              </thead>

              <tbody>{tablaFinal}</tbody>

              {/* <tbody>
                <tr>
                  <td>codigoCatalogo</td>
                  <td> nombre </td>
                  <td> descripcion </td>
                  <td> estadoRegistro </td>
                  <td> fechaActualizacion </td>
                  <td> fechaCreacion </td>
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
  )
}
