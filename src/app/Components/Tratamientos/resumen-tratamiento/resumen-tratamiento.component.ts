import { Component } from '@angular/core';
import { ResumenMedicinaComponent } from "../../Medicinas/resumen-medicina/resumen-medicina.component";
import { CommonModule } from '@angular/common';
import { TreatmentService } from '../../../Core/Services/treatment.service';
import { ResumenPacienteComponent } from "../../Paciente/resumen-paciente/resumen-paciente.component";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-resumen-tratamiento',
  standalone: true,
  imports: [ResumenMedicinaComponent, CommonModule, ResumenPacienteComponent],
  templateUrl: './resumen-tratamiento.component.html',
  styleUrls: ['./resumen-tratamiento.component.css'] // Corregido el nombre de la propiedad
})
export class ResumenTratamientoComponent {
  treatment: any = {};

  constructor(
    private treatmentService: TreatmentService,
    private toastrService: ToastrService,
    private router: Router // Inyectar Router
  ) {}

  ngOnInit() {
    this.treatmentService.getTreatment().subscribe(data => {
      this.treatment = data;
    });
  }

  onMedicineDeleted(medicineId: string) {
    this.treatmentService.removeMedication(medicineId);
  }

  onQuantityIncreased(medicineId: string) {
    this.treatmentService.increaseMedicationQuantity(medicineId);
  }

  onQuantityDecreased(medicineId: string) {
    this.treatmentService.decreaseMedicationQuantity(medicineId);
  }

  onObservationChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      this.treatmentService.updateObservation(target.value);
    }
  }

  deletePatient() {
    const id = 0;
    const name = '';
    this.treatmentService.updatePatient(id, name);
  }

  saveTreatment() {
    this.treatmentService.saveTreatment().subscribe(
      response => {
        if (response.success === false) {
          this.toastrService.error("El tratamiento tiene errores", "Alerta");
          response.messages.forEach((message: string) => {
            this.toastrService.error(message, "Alerta");
          });
        } else {
          console.log('Tratamiento guardado correctamente:', response);
          this.toastrService.success("El tratamiento se guardó correctamente", "Éxito");
          this.router.navigate(['/dashboardMedicinas']);
        }
      },
      error => {
        this.toastrService.error("Ocurrió un error inesperado", "Alerta");
        console.error('Error inesperado:', error);
      }
    );
  }
}
