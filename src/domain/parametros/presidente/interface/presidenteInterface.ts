import { PresidenteModel, RegistroPresidente } from "../models/presidenteModel";

export interface IPresidente{

  getAllPresidentes(): Promise<PresidenteModel[] | undefined>
  RegistrarPresidente(gremio: RegistroPresidente): Promise<boolean>
  
}