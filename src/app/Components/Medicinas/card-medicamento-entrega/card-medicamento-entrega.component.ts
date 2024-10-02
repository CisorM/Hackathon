import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-medicamento-entrega',
  standalone: true,
  imports: [],
  templateUrl: './card-medicamento-entrega.component.html',
  styleUrls: ['./card-medicamento-entrega.component.css']
})
export class CardMedicamentoEntregaComponent {
  @Input() medicine: { name: string; id: number; quantity: number; maxQuantity: number } = {
    name: '',
    id: 0,
    quantity: 0,
    maxQuantity: 0
  };

  @Output() medicineDeleted = new EventEmitter<number>();
  @Output() quantityIncreased = new EventEmitter<number>();
  @Output() quantityDecreased = new EventEmitter<number>();

  deleteMedicine() {
    this.medicineDeleted.emit(this.medicine.id);
  }

  decreaseQuantity() {
    if (this.medicine.quantity > 0) {
      this.medicine.quantity--;
      this.quantityDecreased.emit(this.medicine.id);
    }
  }

  increaseQuantity() {
    if (this.medicine.quantity < this.medicine.maxQuantity) {
      this.medicine.quantity++;
      this.quantityIncreased.emit(this.medicine.id);
    }
  }
}
