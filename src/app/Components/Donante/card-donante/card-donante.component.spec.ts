import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDonanteComponent } from './card-donante.component';

describe('CardDonanteComponent', () => {
  let component: CardDonanteComponent;
  let fixture: ComponentFixture<CardDonanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDonanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDonanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
