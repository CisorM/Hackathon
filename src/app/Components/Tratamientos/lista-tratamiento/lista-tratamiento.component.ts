import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreatmentInterface } from '../../../Core/Interfaces/treatment.interface';
import { CardTratamientoComponent } from '../card-tratamiento/card-tratamiento.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';

@Component({
  selector: 'app-lista-tratamiento',
  standalone: true,
  imports: [CardTratamientoComponent, CommonModule],
  templateUrl: './lista-tratamiento.component.html',
  styleUrl: './lista-tratamiento.component.css',
})
export class ListaTratamientoComponent {
  @Input()
  idPaciente: number | null = null;
  @Input()
  id: number | null = null;

  treatments: TreatmentInterface[] | null = null;

  filteredTreatments: TreatmentInterface[] = [];

  @Output() tratamientoSeleccionado = new EventEmitter<TreatmentInterface>();

  @Output() deletePatient = new EventEmitter<string>();

  constructor(private http: HttpClient) {
    this.loadTreatments();
  }

  delete() {
    this.deletePatient.emit();
  }

  loadTreatments() {
    const { headers } = getCookieHeader();
    this.http
      .get<{ data: { Treatment: TreatmentInterface[] } }>(
        `${appSettings.apiUrl}treatment/getAll`,
        {
          headers,
        }
      )
      .subscribe((response) => {
        this.treatments = response.data.Treatment;
        console.log(this.treatments);
        this.filterTreatments();
      });
  }

  seleccionarTratamiento(tratamiento: TreatmentInterface) {
    this.tratamientoSeleccionado.emit(tratamiento);
  }

  ngOnChanges() {
    this.filterTreatments();
  }

  filterTreatments() {
    if (this.idPaciente !== null) {
      this.filteredTreatments = this.treatments!.filter(
        (treatment) => treatment.patient_id === this.idPaciente
      );
      console.log(this.filterTreatments);
    } else {
      return;
    }
  }
}
