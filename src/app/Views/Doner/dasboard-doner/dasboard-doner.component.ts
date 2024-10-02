import { Component, OnInit } from '@angular/core';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { H1Component } from '../../../Shared/h1/h1.component';
import { ReportesService } from '../../../Core/Services/reportes.service';
import { CommonModule } from '@angular/common';
import { CommunityMedications } from '../../../Core/Interfaces/reportes.interface';
import { getUserInfoFromToken } from '../../../custom/getJwtInfo';

@Component({
  selector: 'app-dashboard-doner',
  standalone: true,
  imports: [BtnComponent, H1Component, CommonModule],
  templateUrl: './dasboard-doner.component.html',
  styleUrl: './dasboard-doner.component.css',
})
export default class DasboardDonerComponent implements OnInit {
  // Propiedades para almacenar los datos
  name: string = 'usuario';
  mostRequiredMedications: any[] = [];
  mostRequiredMedicationsCopy: any[] = [];
  mostDonatedMedications: any[] = [];
  mostDonatedMedicationsCopy: any[] = [];
  medicationsByCommunity: CommunityMedications[] = [];
  medicationsByCommunityCopy: CommunityMedications[] = [];
  medicationsExpired: any[] = [];
  medicationsExpiredCopy: any[] = [];
  medicationsByExpiredSoon: any[] = [];
  medicationsByExpiredSoonCopy: any[] = [];
  medicationsUrgency: any[] = [];
  medicationsUrgencyCopy: any[] = [];
  pacientesPatologia: any[] = [];
  pacientesPatologiaCopy: any[] = [];

  constructor(private reportesService: ReportesService) {}
  tabs = [
    { id: 'required', label: 'Medicamentos más requeridos' },
    { id: 'patient', label: 'Pacientes por patología' },
    { id: 'donated', label: 'Medicamentos más donados' },
    { id: 'expired', label: 'Medicamentos vencidos' },
    { id: 'expiring-soon', label: 'Medicamentos cerca de vencer' },
    { id: 'urgent', label: 'Medicamentos urgentes' },
    { id: 'by-community', label: 'Medicamentos por comunidad' },
  ];

  contents = [
    { id: 'required', text: 'Medicamentos más requeridos' },
    { id: 'patient', text: 'Pacientes por patología' },
    { id: 'donated', text: 'Medicamentos más donados' },
    { id: 'expired', text: 'Medicamentos vencidos' },
    { id: 'expiring-soon', text: 'Medicamentos cerca de vencer' },
    { id: 'urgent', text: 'Medicamentos urgentes' },
    { id: 'by-community', text: 'Medicamentos por comunidad' },
  ];

  activeTab: string = '';

  onTabClick(tabId: string): void {
    this.activeTab = tabId;
  }

  ngOnInit() {
    const { name } = getUserInfoFromToken();
    this.activeTab = this.tabs[0].id;
    this.name = name;

    this.reportesService.getMostRequiredMedications().subscribe(
      (response) => {
        this.mostRequiredMedications = response.data.Medication_Treatment;
        this.mostRequiredMedicationsCopy = this.mostRequiredMedications.slice(
          0,
          15
        );
      },
      (error) => {
        console.error('Error al obtener los datos de comunidad:', error);
      }
    );

    // Obtener los medicamentos más donados
    this.reportesService.getMostDonatedMedications().subscribe(
      (response) => {
        this.mostDonatedMedications = response.data.Medication;
        this.mostDonatedMedicationsCopy = this.mostDonatedMedications.slice(
          0,
          15
        );
      },
      (error) => {
        console.error('Error al obtener los datos de comunidad:', error);
      }
    );

    // Obtener medicamentos requeridos por comunidad
    this.reportesService.getMedicationsByCommunity().subscribe(
      (response) => {
        this.medicationsByCommunity = response.data.Medication;
        this.medicationsByCommunityCopy = this.medicationsByCommunity.slice(
          0,
          3
        );
      },
      (error) => {
        console.error('Error al obtener los datos de comunidad:', error);
      }
    );

    this.reportesService.getMedicationsExpired().subscribe(
      (response) => {
        this.medicationsExpired = response.data.Medication;
        this.medicationsExpiredCopy = this.medicationsExpired.slice(0, 10);
      },
      (error) => {
        console.error('Error al obtener los datos de comunidad:', error);
      }
    );

    this.reportesService.getMedicationsExpiredSoon().subscribe(
      (response) => {
        this.medicationsByExpiredSoon = response.data.Medication;
        this.medicationsByExpiredSoonCopy = this.medicationsByExpiredSoon.slice(
          0,
          3
        );
      },
      (error) => {
        console.error('Error al obtener los datos de comunidad:', error);
      }
    );

    this.reportesService.getPatientCount().subscribe(
      (response) => {
        this.pacientesPatologia = response.data.patientCountByPathology;
        this.pacientesPatologiaCopy = this.pacientesPatologia.slice(0, 15);
      },
      (error) => {
        console.error('Error al obtener los datos de comunidad:', error);
      }
    );
    this.reportesService.getMedicationsUrgency().subscribe(
      (response) => {
        this.medicationsUrgency = response.data.Medication;
        this.medicationsUrgencyCopy = this.medicationsUrgency.slice(0, 3);
      },
      (error) => {
        console.error('Error al obtener los datos de comunidad:', error);
      }
    );
  }
}
