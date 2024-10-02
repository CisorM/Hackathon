import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicationInterface } from '../../../Core/Interfaces/medication.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-medicamento-with-date',
  imports : [CommonModule],
  standalone: true,
  templateUrl: './card-medicamento-with-date.component.html',
  styleUrls: ['./card-medicamento-with-date.component.css']
})
export class CardMedicamentoWithDateComponent {
  @Input() medicine: {name : string, id : number, expiration_date? : string, quantity : number}  = {
    name: '',
    id : 0,
    expiration_date: "",
    quantity : 1
  };
  @Output() medicineDeleted = new EventEmitter<number>();
  @Output() quantityIncreased = new EventEmitter<number>();
  @Output() quantityDecreased = new EventEmitter<number>();
  @Output() dateChanged = new EventEmitter<{ id: number, newDate: string }>();

  deleteMedicine() {
    this.medicineDeleted.emit(this.medicine?.id);
  }

  decreaseQuantity() {
    if (this.medicine!.quantity! > 0) {
      this.quantityDecreased.emit(this.medicine!.id);
    }
  }

  increaseQuantity() {
    this.quantityIncreased.emit(this.medicine!.id);
  }

  changeDate(event: Event) {
    const input = event.target as HTMLInputElement;
    const selectedDate = new Date(input.value);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (currentDate > selectedDate) {
      input.value = currentDate.toISOString().split('T')[0];
      this.medicine.expiration_date = input.value;
    } else {
      this.medicine.expiration_date = input.value;
    }

    this.dateChanged.emit({ id: this.medicine.id, newDate: selectedDate >= currentDate ? selectedDate.toISOString() : currentDate.toISOString() });
    console.log(this.medicine.expiration_date)
  }
}
