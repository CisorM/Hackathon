import { Component, OnInit } from '@angular/core';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { H1Component } from '../../../Shared/h1/h1.component';
import { ReportesService } from '../../../Core/Services/reportes.service';
import { CommonModule } from '@angular/common';
import { getUserInfoFromToken } from '../../../custom/getJwtInfo';

@Component({
  selector: 'app-dashboard-delivered',
  standalone: true,
  imports: [BtnComponent, H1Component, CommonModule],
  templateUrl: './dasboard-delivered.component.html',
  styleUrl: './dasboard-delivered.component.css',
})
export default class DasboardEntregasComponent implements OnInit {
  // Propiedades para almacenar los datos
  name: string = 'usuario';
  communitiesMostDelivered: any[] = [];
  communitiesMostDeliveredCopy: any[] = [];

  deliveredMedications: any[] = [];
  deliveredMedicationsCopy: any[] = [];

  mostDeliveredPatients: any[] = [];
  mostDeliveredPatientsCopy: any[] = [];

  constructor(private reportesService: ReportesService) {}
  tabs = [
    { id: 'comunidad', label: 'Comunidades más abastecidas' },
    { id: 'medicamentos', label: 'Medicamentos más entregados' },
    { id: 'paciente', label: 'Pacientes más abastecidos' },
  ];

  contents = [
    { id: 'comunidad', label: 'Comunidades más abastecidas' },
    { id: 'medicamentos', label: 'Medicamentos más entregados' },
    { id: 'paciente', label: 'Pacientes más abastecidos' },
  ];

  activeTab: string = '';

  onTabClick(tabId: string): void {
    this.activeTab = tabId;
  }

  ngOnInit() {
    const { name } = getUserInfoFromToken();
    this.activeTab = this.tabs[0].id;
    this.name = name;

    this.reportesService.getCommunitiesMostDelivered().subscribe(
      (response) => {
        this.communitiesMostDelivered = response.data.communities;
        this.communitiesMostDeliveredCopy = this.communitiesMostDelivered.slice(
          0,
          15
        );
      },
      (error) => {
        console.error('Error al obtener los datos de comunidad:', error);
      }
    );

    // Obtener los medicamentos más donados
    this.reportesService.getDeliveredMedications().subscribe(
      (response) => {
        this.deliveredMedications = response.data.deliveries;
        this.deliveredMedicationsCopy = this.deliveredMedications.slice(0, 15);
      },
      (error) => {
        console.error('Error al obtener los datos de comunidad:', error);
      }
    );

    // Obtener medicamentos requeridos por comunidad
    this.reportesService.getMostDeliveredPatients().subscribe(
      (response) => {
        this.mostDeliveredPatients = response.data.patients;
        this.mostDeliveredPatientsCopy = this.mostDeliveredPatients.slice(0, 3);
      },
      (error) => {
        console.error('Error al obtener los datos de comunidad:', error);
      }
    );
  }
}
