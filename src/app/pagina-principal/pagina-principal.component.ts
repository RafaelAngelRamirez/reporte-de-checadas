import { Component, OnInit, Output, EventEmitter} from "@angular/core"
import { Empleado } from "../models/empleado.model"
import { Linea } from "../models/linea.model"
import { Evento } from "../models/evento.model"
import { EVENTOS } from "../models/eventos.constantes"
import { IfStmt } from "@angular/compiler"

@Component({
  selector: "app-pagina-principal",
  templateUrl: "./pagina-principal.component.html",
  styleUrls: ["./pagina-principal.component.css"]
})
export class PaginaPrincipalComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Output() empleadoParaImprimir = new EventEmitter<Empleado >()

  reporteGenerado: boolean = false
  file: any = null

  empleados: Empleado[] = []

  imprimirPagina( empleado: Empleado ) {
    this.empleadoParaImprimir.emit(empleado)
    setTimeout( ()=>{
      window.print()
    } , 1000)
  }

  fileChanged(e: any) {
    this.file = e.target.files[0]
  }

  procesarDocumento() {
    let fileReader = new FileReader()
    //Ocupa estar aqui por que se dispara desde readAsText
    fileReader.onload = (e) => this.ordenar(e, fileReader)

    fileReader.readAsText(this.file, "UTF-8")
    

    this.reporteGenerado = true
  }

  ordenar(e, fileReader) {

    //Si los dos primeros caracteres son [{ debe ser un json 
    // y lo tratamos como tal. 

    let result = <string>fileReader.result

    try {
     let disqueEmpleados = JSON.parse(result)

     this.empleados = disqueEmpleados.map( x => {
      return new Empleado().deserealize(x)
     })

      
    } catch (error) {
      
  
      let arreglo = result.split(/\r\n|\n/)
  
      // Estructura de los datos
      /**
       * 0- Id
       * 1- Nombre
       * 2- Apellidos
       * 3- Entrada
       * 4- DIA DE EVENTO
       * 5- ENTRADA DE EVENTO
       * 6- SALIDA DE EVENTO
       *
       *
       */
      //  "1,JORGE JUAN,LUCAS HERNAN,01/04/2019 00:00,01/04/2019 11:47,01/04/2019 12:21"
  
      arreglo.forEach((linea) => this.separarLineas(linea))
      this.empleados.forEach((empleado) => this.adivinarTipoDeEvento(empleado))
      
    }

  }

  adivinarTipoDeEvento(empleado: Empleado) {
    empleado.eventos.forEachDia((dia: Evento[]) => {
      if (dia.length > 0) this.calcularTipoDeEventoPorDia(dia)
    })
  }

  private calcularTipoDeEventoPorDia(dia: Evento[]) {
    {
      // Solo vamos a usar las estructuras basicas.

      // El primero y el ultimo son entrada y salida.

      dia[0].tipoDeEvento = EVENTOS.ENTRADA
      dia[dia.length - 1].tipoDeEvento = EVENTOS.SALIDA

      // En cuantro eventos, los dos de enmedio son comida.

      if (dia.length >= 4) {
        dia[1].tipoDeEvento = EVENTOS.COMIDA_SALIDA
        dia[2].tipoDeEvento = EVENTOS.COMIDA_ENTRADA
      }

      // En seis eventos los dos primeros desayuno y luego comida.

      if (dia.length >= 6) {
        dia[1].tipoDeEvento = EVENTOS.DESAYUNO_SALIDA
        dia[2].tipoDeEvento = EVENTOS.DESAYUNO_ENTRADA
        dia[3].tipoDeEvento = EVENTOS.COMIDA_SALIDA
        dia[4].tipoDeEvento = EVENTOS.COMIDA_ENTRADA
      }

      // + Menos de cuatro, cinco y mas de 7 ocupa revision.
      if (dia.length < 4 || dia.length === 5 || dia.length > 6) {
        dia.forEach((d) => (d.revisar = true))
        this.diasSinEventoDebenSerNoDefinido(dia)
      }
    }
  }

  private diasSinEventoDebenSerNoDefinido(dia: Evento[]) {
    dia.forEach((d) => {
      if (d.tipoDeEvento === -1) d.tipoDeEvento = EVENTOS.NO_DEFINIDO
    })
  }

  separarLineas(linea) {
    let lineaA = linea.split(",")
    let lineaB = lineaA
    // Creamos un Objeto linea para tener los datos mas facilmente.

    let sLin = new Linea().deserialize(lineaB)

    // Buscamos si existe el empleado para esta linea.
    let empleado = this.empleados.find((emp) => emp.idChecador == sLin.ID)

    if (empleado) {
      this.existe(sLin, empleado)
    } else {
      this.noExiste(sLin)
    }
  }

  private existe(sLin: Linea, empleado: Empleado) {
    empleado.agregarEventos(sLin)
  }

  private noExiste(sLin: Linea) {
    let e = new Empleado().inicializarEmpleado(sLin)
    e.agregarEventos(sLin)
    this.empleados.push(e)
  }

  guardarCambios() {
    this.download(JSON.stringify(this.empleados), "datos", "text/plain")
  }

  download(content, fileName, contentType) {
    var a = document.createElement("a")
    var file = new Blob([content], { type: contentType })
    a.href = URL.createObjectURL(file)
    a.download = fileName
    a.click()
  }
}
