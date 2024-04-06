import { GremioModel, RegistrarCatalogo } from "../../../domain/parametros/gremio/models/gremioModel";
import { API_URL, TOKEN } from "../../../core/urls/gremioUrl";
import { IDeporte } from "../../../domain/parametros/deporte/interface/deporteInterface";
export class DeporteRepository  implements IDeporte {

  async getAllDeporte(): Promise<GremioModel[] | undefined> {
    try {
      const response = await fetch(`${API_URL}/web/obtenerCatalogoParametro/DEPORTE`, {
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

    
      const gremio: GremioModel[] = data.resultado.map((item:GremioModel): GremioModel => ({
        codigoCatalogo: item.codigoCatalogo,
        nombre: item.nombre,
        descripcion: item.descripcion,
        estadoRegistro: item.estadoRegistro,
        idTipoParametro: item.idTipoParametrox?.idTipo,
        fechaCreacion: item.fechaCreacion,
        fechaActualizacion: item.fechaActualizacion,
      }))
      console.log(gremio)
      return gremio

    } catch (error) {
      console.error('Error:', error);
    }

  }


  async RegistrarCatalogo(gremio: RegistrarCatalogo): Promise<boolean> {
    try {
      const token = TOKEN; // Reemplaza 'tu_token_aqui' con tu token real
      const response = await fetch(`${API_URL}/web/registroCatalogoParametro`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Agrega el token como parte del encabezado de autorización
          },
          body: JSON.stringify(gremio) // Convierte el objeto a formato JSON para enviarlo en el cuerpo de la solicitud
      });

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