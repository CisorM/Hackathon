import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CharityInterface } from '../../../Core/Interfaces/charity.interface';

@Component({
  selector: 'app-resumen-donante',
  standalone: true,
  imports: [],
  templateUrl: './resumen-donante.component.html',
  styleUrl: './resumen-donante.component.css'
})
export class ResumenDonanteComponent {
  @Input()
  donante: {charityId: number, charityName : string, razon_social : string} | null = null

  @Output() deleteCharity = new EventEmitter<number>();

  delete() {
    this.deleteCharity.emit(this.donante?.charityId);
  }
}
