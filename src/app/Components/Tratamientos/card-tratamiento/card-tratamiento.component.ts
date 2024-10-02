import { Component, Input } from '@angular/core';
import { TreatmentInterface } from '../../../Core/Interfaces/treatment.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-tratamiento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-tratamiento.component.html',
  styleUrl: './card-tratamiento.component.css'
})
export class CardTratamientoComponent {
  @Input()
  treatment : TreatmentInterface | null = null

  translateStatus(status: "not supplied" | "partially supplied" | "supplied" | undefined): string {
    switch (status) {
      case "not supplied":
        return "No suministrado";
      case "partially supplied":
        return "Parcialmente suministrado";
      case "supplied":
        return "Suministrado";
      default:
        return "Estado desconocido";
    }
  }
}
