import { Component } from '@angular/core';
import { ListaDonanteComponent } from '../../../Components/Donante/lista-donante/lista-donante.component';
import { ListaTratamientoComponent } from '../../../Components/Tratamientos/lista-tratamiento/lista-tratamiento.component';
import { ResumenDonacionComponent } from '../../../Components/Donacion/resumen-donacion/resumen-donacion.component';
import { DeliveryService } from '../../../Core/Services/delivery.service';
import { PatientInterface } from '../../../Core/Interfaces/patient.interface';
import { TreatmentInterface } from '../../../Core/Interfaces/treatment.interface';
import { ListaPacientesComponent } from '../../../Components/Paciente/lista-pacientes/lista-pacientes.component';
import { DeliveryInterface } from '../../../Core/Interfaces/delivery.interface';
import { CommonModule } from '@angular/common';
import { ResumenEntregaComponent } from '../../../Components/Entrega/resumen-entrega/resumen-entrega.component';

@Component({
  selector: 'app-form-entrega',
  standalone: true,
  imports: [
    ListaDonanteComponent,
    ListaTratamientoComponent,
    ListaPacientesComponent,
    CommonModule,
    ResumenEntregaComponent,
  ],
  templateUrl: './form-entrega.component.html',
  styleUrls: ['./form-entrega.component.css'], // Cambiado a styleUrls
})
export default class FormEntregaComponent {
  delivery: DeliveryInterface | null = null;

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit() {
    this.deliveryService.getDelivery().subscribe((delivery) => {
      this.delivery = delivery;
    });
  }

  onPacienteSeleccionado(paciente: PatientInterface) {
    this.deliveryService.updatePatient(
      +paciente.id!,
      +paciente.id_card,
      `${paciente.first_name} ${paciente.last_name}`
    );
  }

  onDeletePaciente(){
    this.deliveryService.updatePatient(0,0,'')
  }

  onTratamientoSeleccionado(tratamiento: TreatmentInterface) {
    this.deliveryService.updateDelivery({ treatment_id: tratamiento.id! });
    this.deliveryService.addMedicationsFromTreatment(tratamiento);
  }
}
