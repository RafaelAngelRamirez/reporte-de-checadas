import { Component, OnInit, Input } from "@angular/core"
import { Evento } from "../models/evento.model"
import { EVENTOS } from "../models/eventos.constantes"
import { filter } from "minimatch"

@Component({
  selector: "app-detalle-de-eventos",
  templateUrl: "./detalle-de-eventos.component.html",
  styleUrls: ["./detalle-de-eventos.component.css"]
})
export class DetalleDeEventosComponent implements OnInit {
  keys = Object.keys

  @Input() eventosMes: {
    [dia: string]: Evento[]
  } = {}

  eventoEditandose: Evento = null

  tiposDeEventos = EVENTOS

  tiposDeEventosNumeros = Object.values(EVENTOS)

  constructor() {}

  ngOnInit() {}

  reordenarEventos(eventos: Evento[]) {
    eventos.sort((a, b) => a.tipoDeEvento - b.tipoDeEvento)
  }

  eliminarEvento(e: Evento, eventos: Evento[]) {
    let a = confirm("Estas seguro de eliminar este evento?")

    let indice = eventos.findIndex((x) => {
      return x === e
    })

    if (a) eventos.splice(indice, 1)
  }

  obtenerEventos(eventos: Evento[], i: number): Evento[] {
    let e = eventos.filter((ev) => ev.tipoDeEvento === i)

    return e
  }

  onChangeSelection(e, evento: Evento) {
    evento.tipoDeEvento = parseInt(e)
  }

  onChangeDate(e, evento: Evento) {
    console.log(e)
  }

  fechaTemporal: {
    fecha: { year: number; month: number; day: number }
    hora: { hour: number; minute: number }
  } = {
    fecha: {
      year: null,
      month: null,
      day: null
    },
    hora: {
      hour: null,
      minute: null
    }
  }

  aplicarCambiosAEvento(evento: Evento) {
    let hora: Date

    hora = new Date(
      Object.values(this.fechaTemporal.fecha).join("-") +
        " " +
        Object.values(this.fechaTemporal.hora).join(":")
    )

    evento.editar = false
    evento.hora = hora
  }

  cancelarCambiosAEvento(ev: Evento) {
    ev.editar = false
    this.fechaTemporal = {
      fecha: {
        year: null,
        month: null,
        day: null
      },
      hora: {
        hour: null,
        minute: null
      }
    }

    this.eventoEditandose = null
  }

  editarEvento(ev: Evento) {
    let editar = this.comprobarOtrasEdicionesDeCambios()
    if (editar) {
      this.eventoEditandose = ev
      this.fechaTemporal.fecha.year = ev.hora.getFullYear()
      this.fechaTemporal.fecha.month = ev.hora.getMonth()
      this.fechaTemporal.fecha.day = ev.hora.getDay()
      this.fechaTemporal.hora.hour = ev.hora.getHours()
      this.fechaTemporal.hora.minute = ev.hora.getMinutes()
      ev.editar = true
    }
  }

  private comprobarOtrasEdicionesDeCambios(): boolean {
    let editar = true

    if (this.eventoEditandose) {
      let c = confirm("Hay otro evento editandose. Quieres cancelar?")

      if (c) {
        this.cancelarCambiosAEvento(this.eventoEditandose)
        editar = true
      } else {
        editar = false
      }
    }

    return editar
  }
}
