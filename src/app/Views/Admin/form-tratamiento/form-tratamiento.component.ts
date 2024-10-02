import { Component, OnInit } from '@angular/core';
import { ResumenTratamientoComponent } from "../../../Components/Tratamientos/resumen-tratamiento/resumen-tratamiento.component";
import { ListaPacientesComponent } from "../../../Components/Paciente/lista-pacientes/lista-pacientes.component";
import { TreatmentService } from '../../../Core/Services/treatment.service';
import { ListaMedicinasComponent } from "../../../Components/Medicinas/lista-medicinas/lista-medicinas.component";
import { CommonModule } from '@angular/common';
import { H1Component } from '../../../Shared/h1/h1.component';
import { PatientInterface } from '../../../Core/Interfaces/patient.interface';
import { TreatmentInterface } from '../../../Core/Interfaces/treatment.interface';
import { MedicationInterface } from '../../../Core/Interfaces/medication.interface';

@Component({
  selector: 'app-form-tratamiento',
  standalone: true,
  imports: [H1Component, ResumenTratamientoComponent, ListaPacientesComponent, ListaMedicinasComponent, CommonModule],
  templateUrl: './form-tratamiento.component.html',
  styleUrls: ['./form-tratamiento.component.css']
})
export default class FormTratamientoComponent implements OnInit {

  treatment: TreatmentInterface | null = null;

  constructor(private treatmentService: TreatmentService) {}

  ngOnInit() {
    this.treatmentService.getTreatment().subscribe(data => {
      this.treatment = data;
    });
  }

  onPacienteSeleccionado(paciente: PatientInterface) {
    this.treatmentService.updatePatient(+paciente.id!, `${paciente.first_name} ${paciente.last_name}`)
    console.log(this.treatment)
  }

  onDeletePaciente(){
    this.treatmentService.updatePatient(0, '')
  }

  onMedicinaSeleccionada(medicina : MedicationInterface){
    this.treatmentService.addMedication(medicina.id!, medicina.name!, 1)
  }

}
