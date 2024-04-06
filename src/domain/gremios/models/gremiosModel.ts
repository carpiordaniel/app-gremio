export interface GremiosModel {
  nombreEquipo: string
  presidente: string
  deporte: string
  gremio: string
  categoria: string
  carrera: string
}

export interface RegistrarGremios{
  nombreEquipo: string,
  idDeporte:number,
  idGremio: number,
  idCategoria: number 
  idCarrera: number 
  idPresidente: number 
}
