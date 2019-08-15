import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reporte-de-checadas';


  file: any 
  fileChanged(algo: any){

    console.log(algo)


  }
  
}
