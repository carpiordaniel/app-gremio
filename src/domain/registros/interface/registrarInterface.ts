
import { IRegistrarPostulantes, ISubirAdjunto, RegistrosModel } from "../models/registrosModel";

export interface IRegistrar{

  getAllEquiposPorUser(): Promise<RegistrosModel[] | undefined>
  
  RegistrarPostulantes(gremio: IRegistrarPostulantes): Promise<boolean>
  SubirAdjunto(adjunto: ISubirAdjunto): Promise<boolean>
  
}