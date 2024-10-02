import { Component, Input } from '@angular/core';
import { CharityInterface } from '../../../Core/Interfaces/charity.interface';

@Component({
  selector: 'app-card-donante',
  standalone: true,
  imports: [],
  templateUrl: './card-donante.component.html',
  styleUrl: './card-donante.component.css',
})
export class CardDonanteComponent {
  @Input()
  charity: CharityInterface | null = null;
  id_card = `${this.charity?.indentification_type}-${this.charity?.identification}`;
}
