import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenEntregaComponent } from './resumen-entrega.component';

describe('ResumenEntregaComponent', () => {
  let component: ResumenEntregaComponent;
  let fixture: ComponentFixture<ResumenEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenEntregaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
