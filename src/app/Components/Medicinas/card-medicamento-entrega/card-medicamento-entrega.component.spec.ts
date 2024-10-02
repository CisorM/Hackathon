import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMedicamentoEntregaComponent } from './card-medicamento-entrega.component';

describe('CardMedicamentoEntregaComponent', () => {
  let component: CardMedicamentoEntregaComponent;
  let fixture: ComponentFixture<CardMedicamentoEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMedicamentoEntregaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardMedicamentoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
