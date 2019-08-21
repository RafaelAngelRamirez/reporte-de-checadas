export class Linea {
  constructor(
    public ID?: number,
    public NOMBRE?: string,
    public APELLIDOS?: string,
    public DIA_DE_EVENTO?: Date,
    public ENTRADA_DE_EVENTO?: Date,
    public SALIDA_DE_EVENTO?: Date
  ) {}

  deserialize(linea: string[]) {
   
    this.ID = <number>(<any>linea[0])
    this.NOMBRE = linea[1]
    this.APELLIDOS = linea[2]
    this.DIA_DE_EVENTO = this.parsearFecha(linea[3])
   
    this.ENTRADA_DE_EVENTO = this.parsearFecha(linea[4])
    this.SALIDA_DE_EVENTO = this.parsearFecha(linea[5])

    return this
  }

  parsearFecha(dateMal: string): Date {
    // Solo retornamos campos que existan el formato valido
    if (dateMal) {
      let [fechaMal, horaBien] = dateMal.split(" ")
      let [dia, mes, anio] = fechaMal.split("/")

      return new Date(`${anio}-${mes}-${dia} ${horaBien}`)
    }
  }
}
