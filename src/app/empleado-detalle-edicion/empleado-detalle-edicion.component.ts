import { Component, OnInit, Input } from '@angular/core';
import { Empleado } from '../models/empleado.model';

@Component({
  selector: 'app-empleado-detalle-edicion',
  templateUrl: './empleado-detalle-edicion.component.html',
  styles: []
})
export class EmpleadoDetalleEdicionComponent implements OnInit {

  keys = Object.keys


  @Input() empleado: Empleado = null
  constructor() { }

  ngOnInit() {
  }

}
