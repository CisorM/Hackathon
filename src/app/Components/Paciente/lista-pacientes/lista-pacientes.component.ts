import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardPacientesComponent } from '../card-pacientes/card-pacientes.component';
import { CommonModule } from '@angular/common';
import { SearchBarInputComponent } from '../../../Shared/search-bar-input/search-bar-input.component';
import { PatientInterface } from '../../../Core/Interfaces/patient.interface';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';

@Component({
  selector: 'app-lista-pacientes',
  standalone: true,
  imports: [CardPacientesComponent, CommonModule, SearchBarInputComponent],
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css'],
})
export class ListaPacientesComponent implements OnInit {
  pacientes: PatientInterface[] = [];
  filteredPatients: PatientInterface[] = [];

  @Output() pacienteSeleccionado = new EventEmitter<PatientInterface>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    const apiUrl = `${appSettings.apiUrl}patient/getAll`;
    const { headers } = getCookieHeader();
    this.http
      .get<{ message: string; data: { Patients: PatientInterface[] } }>(
        apiUrl,
        { headers }
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.pacientes = response.data.Patients;
          this.filteredPatients = this.pacientes;
        },
        (error) => {
          console.error('Error al obtener pacientes:', error);
        }
      );
  }

  seleccionarPaciente(paciente: PatientInterface) {
    this.pacienteSeleccionado.emit(paciente);
  }

  realizarBusqueda(busqueda: number) {
    this.filteredPatients = this.pacientes.filter((paciente) =>
      paciente.id_card.toString().includes(busqueda.toString())
    );
    console.log(this.filteredPatients)
  }

  limpiarBusqueda() {
    this.filteredPatients = this.pacientes;
  }
}
