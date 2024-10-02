import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMedicamentoWithDateComponent } from './card-medicamento-with-date.component';

describe('CardMedicamentoWithDateComponent', () => {
  let component: CardMedicamentoWithDateComponent;
  let fixture: ComponentFixture<CardMedicamentoWithDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMedicamentoWithDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardMedicamentoWithDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
