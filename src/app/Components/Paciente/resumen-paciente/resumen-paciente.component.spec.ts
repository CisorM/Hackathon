import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenPacienteComponent } from './resumen-paciente.component';

describe('ResumenPacienteComponent', () => {
  let component: ResumenPacienteComponent;
  let fixture: ComponentFixture<ResumenPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
