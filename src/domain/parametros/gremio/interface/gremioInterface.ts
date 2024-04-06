import { GremioModel, RegistrarCatalogo } from "../models/gremioModel";

export interface IGremio {

  getAllGremio(): Promise<GremioModel[] | undefined>
  RegistrarCatalogo(gremio: RegistrarCatalogo): Promise<boolean>
  
}