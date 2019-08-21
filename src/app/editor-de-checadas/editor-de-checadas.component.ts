import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { Empleado } from "../models/empleado.model"

@Component({
  selector: "app-editor-de-checadas",
  templateUrl: "./editor-de-checadas.component.html",
  styleUrls: ["./editor-de-checadas.component.css"]
})
export class EditorDeChecadasComponent implements OnInit {
  
  @Input() empleados: Empleado[] = null
  @Output() imprimir = new  EventEmitter<Empleado>()

  empleadoAModificarODetalles: Empleado = null

  constructor() {}

  ngOnInit() {}

  modificarEmpleado(empleado: Empleado) {
    this.empleadoAModificarODetalles = empleado
  }


  imprimirEmpleado( empleado: Empleado ){
    this.imprimir.emit(empleado)
  }
}
