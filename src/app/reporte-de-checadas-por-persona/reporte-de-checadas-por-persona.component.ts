import { Component, OnInit, Input } from "@angular/core"
import { Empleado } from "../models/empleado.model"

@Component({
  selector: "app-reporte-de-checadas-por-persona",
  templateUrl: "./reporte-de-checadas-por-persona.component.html",
  styleUrls: ["./reporte-de-checadas-por-persona.component.css"]
})
export class ReporteDeChecadasPorPersonaComponent implements OnInit {
  keys = Object.keys

  @Input() empleado: Empleado = null

  constructor() {}

  ngOnInit() {}

  llaves(objeto: any) {
    if (objeto) {
      let llaves = Object.keys(objeto)
      return llaves
    }
  }
}
