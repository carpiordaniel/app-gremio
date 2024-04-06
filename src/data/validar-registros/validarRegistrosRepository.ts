import { API_URL, TOKEN } from "../../core/urls/gremioUrl";
import { IValidarRegistros } from "../../domain/validar-registros/interface/validarRegistrosInterface";
import { validarRegistroModel } from "../../domain/validar-registros/models/validarRegistroModel";


export class ValidarRegistrosRepository  implements IValidarRegistros {
  
  async getAllPostulantes(): Promise<validarRegistroModel[] | undefined> {
    try {
      const response = await fetch(`${API_URL}/web/obtenerListadoPostulantes`, {
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

    
      const gremio: validarRegistroModel[] = data.resultado.map((item:validarRegistroModel): validarRegistroModel => ({
        nombres: item.nombres,
        apellidos: item.apellidos,
        cedula: item.cedula,
        email: item.email,
        deporte: item.deporte
      }))
      console.log(gremio)
      return gremio

    } catch (error) {
      console.error('Error:', error);
    }

  }  

}
