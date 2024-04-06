import { GremioModel, RegistrarCatalogo } from "../../gremio/models/gremioModel";

export interface ICarrera{

  getAllCarrera(): Promise<GremioModel[] | undefined>
  RegistrarCatalogo(gremio: RegistrarCatalogo): Promise<boolean>
  
}