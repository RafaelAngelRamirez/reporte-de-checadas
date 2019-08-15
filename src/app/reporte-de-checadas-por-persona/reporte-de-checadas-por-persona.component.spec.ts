import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDeChecadasPorPersonaComponent } from './reporte-de-checadas-por-persona.component';

describe('ReporteDeChecadasPorPersonaComponent', () => {
  let component: ReporteDeChecadasPorPersonaComponent;
  let fixture: ComponentFixture<ReporteDeChecadasPorPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDeChecadasPorPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDeChecadasPorPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
