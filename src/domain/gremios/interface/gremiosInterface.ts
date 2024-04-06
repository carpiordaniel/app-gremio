import { GremiosModel, RegistrarGremios } from "../models/gremiosModel";

export interface IGremios {

  getAllGremios(): Promise<GremiosModel[] | undefined>
  RegistrarGremios(gremio: RegistrarGremios): Promise<boolean>
  
}