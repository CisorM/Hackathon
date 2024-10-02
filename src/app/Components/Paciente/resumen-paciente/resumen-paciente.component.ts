import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-resumen-paciente',
  standalone: true,
  imports: [],
  templateUrl: './resumen-paciente.component.html',
  styleUrl: './resumen-paciente.component.css',
})
export class ResumenPacienteComponent {
  @Input()
  paciente: { patientName: string; patientId: string } = {
    patientName: '',
    patientId: '',
  };

  @Output() deletePatient = new EventEmitter<string>();

  delete() {
    this.deletePatient.emit(this.paciente.patientId);
  }
}
