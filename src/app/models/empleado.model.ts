import { Linea } from "./linea.model"
import { OrganizadorDeEventos } from "./organizadorDeEventos.model"
export class Empleado {
  constructor(
    public idChecador?: number,
    public nombre?: string,
    public apellidos?: string,
    public eventos: OrganizadorDeEventos = new OrganizadorDeEventos()
  ) {}

  deserealize( input: this ): this{
    Object.assign( this, input)
    this.eventos = new OrganizadorDeEventos().deserealize(input.eventos)
    return this
  }

  inicializarEmpleado(sLin: Linea) {
    this.idChecador = sLin.ID
    this.nombre = sLin.NOMBRE
    this.apellidos = sLin.APELLIDOS

    return this
  }

  agregarEventos(sLin: Linea) {
    // Tenemos que organizar todo el chow este
    this.eventos.agregarEventos(sLin)
  }

  esNecesarioRevisar() {
    for (const year in this.eventos.datos) {
      if (this.eventos.hasOwnProperty(year)) {
        const anio = this.eventos[year]

        for (const month in anio) {
          if (anio.hasOwnProperty(month)) {
            const mes = anio[month]
            for (const day in mes) {
              if (mes.hasOwnProperty(day)) {
                const dia = mes[day]
                let a = dia.find((evento) => evento.revisar)
                if (a) {
                  return true
                }
              }
            }
          }
        }
      }
    }
  }
}
