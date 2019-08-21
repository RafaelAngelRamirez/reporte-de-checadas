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

  onChangeDate( e, evento: Evento ){


    console.log( e )


  }
}
