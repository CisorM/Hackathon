import { Component } from '@angular/core';
import { DeliveryService } from '../../../Core/Services/delivery.service';
import { CommonModule } from '@angular/common';
import { ResumenPacienteComponent } from "../../Paciente/resumen-paciente/resumen-paciente.component";
import { DeliveryInterface } from '../../../Core/Interfaces/delivery.interface';
import { CardMedicamentoEntregaComponent } from "../../Medicinas/card-medicamento-entrega/card-medicamento-entrega.component";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen-entrega',
  standalone: true,
  imports: [CommonModule, ResumenPacienteComponent, CardMedicamentoEntregaComponent],
  templateUrl: './resumen-entrega.component.html',
  styleUrls: ['./resumen-entrega.component.css'] // Corregido el nombre de la propiedad
})
export class ResumenEntregaComponent {
  delivery: DeliveryInterface | null = null;

  constructor(
    private deliveryService: DeliveryService,
    private toastService: ToastrService,
    private router: Router // Inyectar el Router
  ) {}

  ngOnInit() {
    this.deliveryService.getDelivery().subscribe(delivery => {
      this.delivery = delivery;
    });
  }

  onMedicineDeleted(medicineId: number) {
    this.deliveryService.removeMedication(medicineId);
  }

  onQuantityIncreased(medicineId: number) {
    this.deliveryService.increaseMedicationQuantity(medicineId);
  }

  onQuantityDecreased(medicineId: number) {
    this.deliveryService.decreaseMedicationQuantity(medicineId);
  }

  onExpireDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      this.deliveryService.updateExpirationDate(target.value);
    }
    console.log(this.delivery);
  }

  onWithdrawalDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      this.deliveryService.onWithdrawalDateChange(target.value);
    }
    console.log(this.delivery);
  }

  onApoinmentDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      this.deliveryService.onApoinmentDateChange(target.value);
    }
    console.log(this.delivery);
  }

  deletePatient() {
    const id = 0;
    const idCard = 0;
    const name = '';
    this.deliveryService.updatePatient(id, idCard, name);
    this.toastService.success("Eliminado", "Alerta");
  }

  public saveDelivery(): void {
    this.deliveryService.saveDelivery().subscribe(
      response => {
        if (response.success === false) {
          this.toastService.error("La entrega tiene errores", "Alerta");
          response.messages.forEach((message: string) => {
            this.toastService.error(message, "Alerta");
          });
        } else {
          console.log('Delivery saved successfully:', response);
          this.toastService.success("La entrega se guardó correctamente", "Éxito");
          this.router.navigate(['/gestionEntrega']);
        }
      },
      error => {
        this.toastService.error("Ocurrió un error inesperado", "Alerta");
        console.error('Error inesperado:', error);
      }
    );
  }
}
