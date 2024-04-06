import { API_URL, TOKEN } from "../../../core/urls/gremioUrl";
import { IPresidente } from "../../../domain/parametros/presidente/interface/presidenteInterface";
import { PresidenteModel, RegistroPresidente } from "../../../domain/parametros/presidente/models/presidenteModel";



export class PresidenteRepository implements IPresidente {
  
  async getAllPresidentes(): Promise<PresidenteModel[] | undefined> {
    
    try {
      const response = await fetch(`${API_URL}/web/obtenerListadoPresidentes`, {
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

    
      const gremio: PresidenteModel[] = data.resultado.map((item: PresidenteModel): PresidenteModel => ({
        nombre: item.nombre,
        idUser: item.idUser,
      }))
      console.log(gremio)
      return gremio

    } catch (error) {
      console.error('Error:', error);
    }
    
  }


  async RegistrarPresidente(presidente: RegistroPresidente): Promise<boolean> {
    try {
      const token = TOKEN; // Reemplaza 'tu_token_aqui' con tu token real
      const response = await fetch(`${API_URL}/auth/registrarUser`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Agrega el token como parte del encabezado de autorización
          },
          body: JSON.stringify(presidente) // Convierte el objeto a formato JSON para enviarlo en el cuerpo de la solicitud
      });

      const data = await response.json()
      console.log(data)
      if (data.mensaje == 'El email ingresado ya está siendo utilizado.') {
        alert("El email ingresado ya está siendo utilizado")
        return false
      }
      console.log("****",response)

      if (response.ok) {
          return true; // Indica que la inserción fue exitosa
      } else {
          // En caso de que la respuesta no sea exitosa, maneja el error aquí
          console.error('Error al insertar el presidente:', response.statusText);
          return false; // Indica que la inserción falló
      }
    } catch (error) {
        console.error('Error de red:', error);
        return false; // Indica que la inserción falló debido a un error de red
    }
  }



}