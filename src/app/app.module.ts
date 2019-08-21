import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { ReporteDeChecadasPorPersonaComponent } from "./reporte-de-checadas-por-persona/reporte-de-checadas-por-persona.component"
import { PaginaPrincipalComponent } from "./pagina-principal/pagina-principal.component"
import { EditorDeChecadasComponent } from "./editor-de-checadas/editor-de-checadas.component"
import { DetalleDeEventosComponent } from "./detalle-de-eventos/detalle-de-eventos.component"
import { EmpleadoDetalleEdicionComponent } from "./empleado-detalle-edicion/empleado-detalle-edicion.component"
import { FormsModule } from "@angular/forms"
// FECHAS EN ESPAÑOL
import {  LOCALE_ID } from "@angular/core"
import localePy from "@angular/common/locales/es-MX"
import { registerLocaleData } from "@angular/common"
registerLocaleData(localePy, "es-MX")

// ng-boostrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    ReporteDeChecadasPorPersonaComponent,
    PaginaPrincipalComponent,
    EditorDeChecadasComponent,
    DetalleDeEventosComponent,
    EmpleadoDetalleEdicionComponent,
  ],
  imports: [BrowserModule, FormsModule, NgbModule],
  providers: [{ provide: LOCALE_ID, useValue: "es-MX" },],
  bootstrap: [AppComponent]
})
export class AppModule {}
