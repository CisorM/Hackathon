import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenDonacionComponent } from './resumen-donacion.component';

describe('ResumenDonacionComponent', () => {
  let component: ResumenDonacionComponent;
  let fixture: ComponentFixture<ResumenDonacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenDonacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenDonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
