import { Evento } from "./evento.model"
import { Linea } from "./linea.model"
import { TabuladorDeEventos } from "./tabuladorDeEventos.model"
import { MESES } from "./eventos.constantes"
import { Input } from "@angular/core"

export class OrganizadorDeEventos {
  constructor(
    public datos: {
      [anio: string]: {
        [mes: string]: {
          [dia: string]: Evento[]
        }
      }
    } = {}
  ) {}

  deserealize(input: this): this {
    Object.assign(this, input)
    for (const year in this.datos) {
      if (this.datos.hasOwnProperty(year)) {
        const anio = this.datos[year]
        for (const month in anio) {
          if (anio.hasOwnProperty(month)) {
            const mes = anio[month]
            for (const day in mes) {
              if (mes.hasOwnProperty(day)) {
                mes[day] = mes[day].map((e) => {
                  return new Evento().deserealize(e)
                })
              }
            }
          }
        }
      }
    }

    return this
  }

  obtenerTablaPorMes() {
    let tab: TabuladorDeEventos[] = []
    for (const year in this.datos) {
      if (this.datos.hasOwnProperty(year)) {
        const anio = this.datos[year]
        for (const month in anio) {
          if (anio.hasOwnProperty(month)) {
            const mes = anio[month]
            for (const day in mes) {
              if (mes.hasOwnProperty(day)) {
                const dia = mes[day]

                let t = new TabuladorDeEventos().clasificarEvento(dia)
              }
            }
          }
        }
      }
    }

    return tab
  }

  agregarEventos(sLin: Linea) {
    if (sLin.DIA_DE_EVENTO) {
      let [dia, mes, anio] = this.obtener_dia_mes_anio(sLin.DIA_DE_EVENTO)

      this.revisarInicializacion(this.datos, dia, mes, anio)

      // No hay eventos registrados. Creamos
      if (!this.datos[anio][mes][dia]) {
        this.datos[anio][mes][dia] = []
      }

      // Creamos un nuevo evento para la entrada
      let eE = new Evento()
      eE.hora = sLin.ENTRADA_DE_EVENTO ? sLin.ENTRADA_DE_EVENTO : null
      eE.revisar = !eE.hora
      if (eE.hora) this.datos[anio][mes][dia].push(eE)
      // Creamos un nuevo evento para la salida
      let eS = new Evento()
      eS.hora = sLin.SALIDA_DE_EVENTO ? sLin.SALIDA_DE_EVENTO : null
      eS.revisar = !eS.hora
      if (eS.hora) this.datos[anio][mes][dia].push(eS)
    }
  }

  obtener_dia_mes_anio(date: Date) {
    let dia, mes, anio

    //con letra y en espaniol
    dia = date.getDate()
    mes = MESES[date.getMonth()]

    anio = date.getFullYear()

    return [dia, mes, anio]
  }

  private revisarInicializacion(
    datos: {
      [anio: string]: {
        [mes: string]: {
          [dia: string]: Evento[]
        }
      }
    },
    dia,
    mes,
    anio
  ) {
    if (!datos.hasOwnProperty(anio)) datos[anio] = {}
    if (!datos[anio].hasOwnProperty(mes)) datos[anio][mes] = {}
    if (!datos[anio][mes].hasOwnProperty(dia)) datos[anio][mes][dia] = []
  }

  forEachDia(callbackFn): this {
    for (const year in this.datos) {
      if (this.datos.hasOwnProperty(year)) {
        const anio = this.datos[year]
        for (const month in anio) {
          if (anio.hasOwnProperty(month)) {
            const mes = anio[month]
            for (const day in mes) {
              if (mes.hasOwnProperty(day)) {
                const dia = mes[day]
                callbackFn(dia)
              }
            }
          }
        }
      }
    }

    return this
  }
}
