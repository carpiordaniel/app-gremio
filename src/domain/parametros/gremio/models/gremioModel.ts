export interface GremioModel {
  codigoCatalogo: number
  nombre: string
  descripcion: string
  estadoRegistro: boolean
  idTipoParametro?: number
  idTipoParametrox?: {
    idTipo?: number
  }
  fechaCreacion: string
  fechaActualizacion: string
}

export interface RegistrarCatalogo{
    nombre: string,
    descripcion:string,
    estado: string,
    tipoParametro: string // CATEGORIA -- GREMIO -- CARRERA -- DEPORTE
}
