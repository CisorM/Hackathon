import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-resumen-medicina',
  standalone: true,
  imports: [],
  templateUrl: './resumen-medicina.component.html',
  styleUrl: './resumen-medicina.component.css'
})
export class ResumenMedicinaComponent {
  @Input() medicine: any;
  @Output() medicineDeleted = new EventEmitter<string>();
  @Output() quantityIncreased = new EventEmitter<string>();
  @Output() quantityDecreased = new EventEmitter<string>();

  deleteMedicine() {
    this.medicineDeleted.emit(this.medicine.id);
  }

  decreaseQuantity() {
    if (this.medicine.quantity > 0) {
      this.quantityDecreased.emit(this.medicine.id);
    }
  }

  increaseQuantity() {
    this.quantityIncreased.emit(this.medicine.id);
  }
}
