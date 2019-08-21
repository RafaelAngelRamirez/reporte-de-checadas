export class Evento {
  public get tipoDeEvento(): number
  {
    return <number>this._tipoDeEvento;
  }
  public set tipoDeEvento(value: number)
  {
    this._tipoDeEvento = <number>value;
  }
  constructor(
    // tipos de evento
    /**
     * 0 entrada
     * 1 salida a desayuno
     * 2 entrada desayuno
     * 3 salida comida
     * 4 entrada comida
     * 5 salida
     * 6 no definido  | necesita aclaracion
     */
    private _tipoDeEvento: number = -1,
    public hora?: Date,
    public revisar: boolean = false,
    public editar: boolean = false
  ) {}


  deserealize(input: this): this{
    Object.assign( this, input)
    return this
  }
}
