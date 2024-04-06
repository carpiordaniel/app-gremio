


export interface RegistrosModel{
  idEquipo:  number
  nombreEquipo: string
}

export interface IRegistrarPostulantes{

      nombres: string,
      apellidos: string,
      cedula: string,
      email: string,
      idEquipo: number,
      idAdjuntos: number[]
}

export interface ISubirAdjunto{
  nombreDocumento: string,
  dataBase64: string,

}