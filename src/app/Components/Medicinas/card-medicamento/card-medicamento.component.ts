import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-medicamento',
  standalone: true,
  imports: [],
  templateUrl: './card-medicamento.component.html',
  styleUrl: './card-medicamento.component.css'
})
export class CardMedicamentoComponent {
  @Input()
  medicine : any
}
