import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenDonanteComponent } from './resumen-donante.component';

describe('ResumenDonanteComponent', () => {
  let component: ResumenDonanteComponent;
  let fixture: ComponentFixture<ResumenDonanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenDonanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenDonanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
