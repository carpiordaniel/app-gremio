import { GremioModel, RegistrarCatalogo } from "../../gremio/models/gremioModel";

export interface IDeporte{

  getAllDeporte(): Promise<GremioModel[] | undefined>
  RegistrarCatalogo(gremio: RegistrarCatalogo): Promise<boolean>
  
}