
import { validarRegistroModel } from "../models/validarRegistroModel";

export interface IValidarRegistros {

  getAllPostulantes(): Promise<validarRegistroModel[] | undefined>
  //RegistrarGremios(gremio: RegistrarGremios): Promise<boolean>
  
}