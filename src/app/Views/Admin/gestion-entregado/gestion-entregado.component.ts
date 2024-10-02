import { Component, OnInit, NgZone } from '@angular/core';
import { H1Component } from "../../../Shared/h1/h1.component";
import { Table2Component } from '../../../Shared/table2/table2.component';
import { SearchbarComponent } from '../../../Shared/searchbar/searchbar.component';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { appSettings } from '../../../settings/appsettings';

@Component({
  selector: 'app-gestion-entregado',
  standalone: true,
  imports: [H1Component, Table2Component, SearchbarComponent, BtnComponent],
  templateUrl: './gestion-entregado.component.html',
  styleUrls: ['./gestion-entregado.component.css']
})
export default class GestionEntregadoComponent implements OnInit {
  entregados: any[] = [];
  columnas: string[] = [
    'patient_name',
    'patient_id_card',
    'appointment_date',
    'expiration_date',
  ];
  encabezados: string[] = [
    'Nombre del Paciente',
    'Cedula', // Agrega esta línea
    'Fecha de Entrega',
    'Fecha de Expiración',
  ];

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getEntregados();
  }

  getEntregados() {
    console.log("holi?");
    
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}delivery/getDelivered`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json); // Verificar la respuesta del servidor
        this.ngZone.run(() => {
          console.log(json.data.Delivery); // Verificar la estructura de la respuesta
          this.entregados = json.data.Delivery.map((entregado: any) => ({
            appointment_date: new Date(entregado.appointment_date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            patient_name: entregado.patient ? entregado.patient.first_name : '', // Agrega esta línea
            patient_id: entregado.patient_id,
            patient_id_card: entregado.patient ? entregado.patient.id_card : '', // Agrega esta línea
            expiration_date: new Date(entregado.expiration_date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          }));
          console.log(this.entregados); // Verificar la asignación de variables
        });
      });
  }
}