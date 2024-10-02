import { Component } from '@angular/core';
import { H1Component } from "../../../Shared/h1/h1.component";
import { H2Component } from "../../../Shared/h2/h2.component";

@Component({
  selector: 'app-medicamentos-salida-otro',
  standalone: true,
  imports: [H1Component, H2Component],
  templateUrl: './medicamentos-salida-otro.component.html',
  styleUrl: './medicamentos-salida-otro.component.css'
})
export default class MedicamentosSalidaOtroComponent {

}
