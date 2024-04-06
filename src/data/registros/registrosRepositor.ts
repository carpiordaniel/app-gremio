import { API_URL, TOKEN } from "../../core/urls/gremioUrl";
import { IRegistrar } from "../../domain/registros/interface/registrarInterface";
import { IRegistrarPostulantes, ISubirAdjunto, RegistrosModel } from "../../domain/registros/models/registrosModel";


export class RegistrarRepository implements IRegistrar{
  
  async getAllEquiposPorUser(): Promise<RegistrosModel[] | undefined> {
    try {
      const response = await fetch(`${API_URL}/web/obtenerListadoEquiposPorUsuario`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`
        },
      })
      
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      
      const data = await response.json()

      if(data.length === 0){
        return undefined
      }
      console.log(data)

    
      const equipoPorUser: RegistrosModel[] = data.resultado.map((item: RegistrosModel): RegistrosModel => ({
        idEquipo: item.idEquipo,
        nombreEquipo: item.nombreEquipo
      }))


      console.log(equipoPorUser)
      return equipoPorUser

    } catch (error) {
      console.error('Error:', error);
    }
    
  }

  async RegistrarPostulantes(postulante: IRegistrarPostulantes): Promise<boolean> {
    try {
      const token = TOKEN; // Reemplaza 'tu_token_aqui' con tu token real
      const response = await fetch(`${API_URL}/web/registrarPostulante`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Agrega el token como parte del encabezado de autorización
          },
          body: JSON.stringify(postulante) // Convierte el objeto a formato JSON para enviarlo en el cuerpo de la solicitud
      });

      const data = await response.json()
      console.log(data)
      console.log("****",response)

      if (response.ok) {
          return true; // Indica que la inserción fue exitosa
      } else {
          // En caso de que la respuesta no sea exitosa, maneja el error aquí
          console.error('Error al insertar el gremio:', response.statusText);
          return false; // Indica que la inserción falló
      }
    } catch (error) {
        console.error('Error de red:', error);
        return false; // Indica que la inserción falló debido a un error de red
    }
  }

  async SubirAdjunto(adjunto: ISubirAdjunto): Promise<boolean> {
    try {
      const token = TOKEN; // Reemplaza 'tu_token_aqui' con tu token real
      const response = await fetch(`${API_URL}/web/subirAdjunto`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Agrega el token como parte del encabezado de autorización
          },
          body: JSON.stringify(adjunto) // Convierte el objeto a formato JSON para enviarlo en el cuerpo de la solicitud
      });

      const data = await response.json()
      console.log(data)
      console.log("****",response)

      if (response.ok) {
          return data; // Indica que la inserción fue exitosa
      } else {
          // En caso de que la respuesta no sea exitosa, maneja el error aquí
          console.error('Error al insertar el gremio:', response.statusText);
          return false; // Indica que la inserción falló
      }
    } catch (error) {
        console.error('Error de red:', error);
        return false; // Indica que la inserción falló debido a un error de red
    }


  }


  
}