import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEntregaComponent } from './form-entrega.component';

describe('FormEntregaComponent', () => {
  let component: FormEntregaComponent;
  let fixture: ComponentFixture<FormEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEntregaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
