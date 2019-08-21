import { Evento } from './evento.model';

import { Linea } from './linea.model';

export class TabuladorDeEventos {
    constructor(
      public entrada?: Date,
      public salida?: Date,
      public comidaEntrada?: Date,
      public comidaSalida?: Date,
      public desayunoEntrada?: Date,
      public desayunoSalida?: Date,
      private clasificacionDeEventos: {
        [0]: any
        [1]: any
        [2]: any
        [3]: any
        [4]: any
        [5]: any
        [6]: any
      } = {
        [0]: entrada,
        [1]: salida,
        [2]: comidaEntrada,
        [3]: comidaSalida,
        [4]: desayunoEntrada,
        [5]: desayunoSalida,
        [6]: entrada
      }
    ) {}
  
    clasificarEvento(eventos: Evento[]) {
      eventos.forEach((ev) => {
        this.clasificacionDeEventos[ev.tipoDeEvento] = ev.hora
      })
    }
  
  
  }