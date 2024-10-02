import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDonanteComponent } from './lista-donante.component';

describe('ListaDonanteComponent', () => {
  let component: ListaDonanteComponent;
  let fixture: ComponentFixture<ListaDonanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDonanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaDonanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
