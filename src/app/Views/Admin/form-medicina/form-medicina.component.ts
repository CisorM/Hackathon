import { Component } from '@angular/core';
import { H1Component } from '../../../Shared/h1/h1.component';
import { ResumenTratamientoComponent } from "../../../Components/Tratamientos/resumen-tratamiento/resumen-tratamiento.component";

@Component({
  selector: 'app-form-medicina',
  standalone: true,
  imports: [ResumenTratamientoComponent, H1Component],
  templateUrl: './form-medicina.component.html',
  styleUrl: './form-medicina.component.css'
})
export default class FormMedicinaComponent {

}
