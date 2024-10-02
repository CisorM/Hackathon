import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPacientesComponent } from './card-pacientes.component';

describe('CardPacientesComponent', () => {
  let component: CardPacientesComponent;
  let fixture: ComponentFixture<CardPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPacientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
