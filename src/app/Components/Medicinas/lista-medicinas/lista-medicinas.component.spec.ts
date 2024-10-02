import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMedicinasComponent } from './lista-medicinas.component';

describe('ListaMedicinasComponent', () => {
  let component: ListaMedicinasComponent;
  let fixture: ComponentFixture<ListaMedicinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMedicinasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaMedicinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
