import { GremioModel, RegistrarCatalogo } from "../../gremio/models/gremioModel";

export interface ICategoria {

  getAllCategoria(): Promise<GremioModel[] | undefined>
  RegistrarCatalogo(gremio: RegistrarCatalogo): Promise<boolean>
  
}