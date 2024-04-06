
import { GremiosModel, RegistrarGremios } from "../../domain/gremios/models/gremiosModel";
import { IGremios } from "../../domain/gremios/interface/gremiosInterface";
import { API_URL, TOKEN } from "../../core/urls/gremioUrl";



export class GremiosRepository  implements IGremios {
  
  async getAllGremios(): Promise<GremiosModel[] | undefined> {
    try {
      const response = await fetch(`${API_URL}/web/obtenerListadoEquipos`, {
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

    
      const gremio: GremiosModel[] = data.resultado.map((item: GremiosModel ): GremiosModel => ({
        nombreEquipo: item.nombreEquipo,
        presidente: item.presidente,
        deporte: item.deporte,
        gremio: item.gremio,
        categoria: item.categoria,
        carrera: item.carrera,

      }))
      console.log(gremio)
      return gremio

    } catch (error) {
      console.error('Error:', error);
    }

  }


  async RegistrarGremios(gremio: RegistrarGremios): Promise<boolean> {
    try {
      const token = TOKEN; // Reemplaza 'tu_token_aqui' con tu token real
      const response = await fetch(`${API_URL}/web/registrarEquipo`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Agrega el token como parte del encabezado de autorización
          },
          body: JSON.stringify(gremio) // Convierte el objeto a formato JSON para enviarlo en el cuerpo de la solicitud
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

  
}