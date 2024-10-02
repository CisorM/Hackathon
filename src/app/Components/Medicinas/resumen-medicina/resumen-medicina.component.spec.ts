import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenMedicinaComponent } from './resumen-medicina.component';

describe('ResumenMedicinaComponent', () => {
  let component: ResumenMedicinaComponent;
  let fixture: ComponentFixture<ResumenMedicinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenMedicinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenMedicinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
