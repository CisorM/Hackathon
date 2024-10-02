import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.css']
})
export class BtnComponent {
  @Input() label: string = 'Botón';
  @Input() disabled: boolean = false;
  @Input() route: string = ''; // Agregamos una propiedad de entrada para la ruta
  @Input() type: string = 'button'; // Agregamos una propiedad de entrada para el tipo de botón

  constructor(private router: Router) { }

  handleClick() {
    if (this.route) {
      this.router.navigate([this.route]); // Navegamos a la ruta pasada como parámetro
    }
  }
}