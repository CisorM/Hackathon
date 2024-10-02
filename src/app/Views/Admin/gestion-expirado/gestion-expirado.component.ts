import { Component, OnInit, NgZone } from '@angular/core';
import { H1Component } from "../../../Shared/h1/h1.component";
import { Table2Component } from '../../../Shared/table2/table2.component';
import { SearchbarComponent } from '../../../Shared/searchbar/searchbar.component';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { appSettings } from '../../../settings/appsettings';

@Component({
  selector: 'app-gestion-expirado',
  standalone: true,
  imports: [H1Component, Table2Component, SearchbarComponent, BtnComponent],
  templateUrl: './gestion-expirado.component.html',
  styleUrls: ['./gestion-expirado.component.css']
})
export default class GestionExpiradoComponent implements OnInit {
  expirados: any[] = [];
  columnas: string[] = [
    'patient_name',
    'patient_id_card',
    'appointment_date',
    'expiration_date',
  ];
  encabezados: string[] = [
    'Nombre del Paciente',
    'Cedula',
    'Fecha de Entrega',
    'Fecha de Expiración',
  ];

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getExpirados();
  }

  getExpirados() {
    console.log("holi?");
    
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}delivery/getExpired`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json); // Verificar la respuesta del servidor
        this.ngZone.run(() => {
          console.log(json.data.Delivery); // Verificar la estructura de la respuesta
          this.expirados = json.data.Delivery.map((expirado: any) => ({
            appointment_date: new Date(expirado.appointment_date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            patient_name: expirado.patient ? expirado.patient.first_name : '',
            patient_id: expirado.patient_id,
            patient_id_card: expirado.patient ? expirado.patient.id_card : '',
            expiration_date: new Date(expirado.expiration_date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          }));
          console.log(this.expirados); // Verificar la asignación de variables
        });
      });
  }
}