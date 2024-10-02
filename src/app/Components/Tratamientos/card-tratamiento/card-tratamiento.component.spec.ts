import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTratamientoComponent } from './card-tratamiento.component';

describe('CardTratamientoComponent', () => {
  let component: CardTratamientoComponent;
  let fixture: ComponentFixture<CardTratamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTratamientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
