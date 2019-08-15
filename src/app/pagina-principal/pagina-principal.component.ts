import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  file: any 

  imprimirPagina(){
    window.print()
  }

  fileChange(file: any){}

}
