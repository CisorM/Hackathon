import { Component, OnInit, NgZone } from '@angular/core';
import { H1Component } from '../../../Shared/h1/h1.component';
import { Table2Component } from '../../../Shared/table2/table2.component';
import { SearchbarComponent } from '../../../Shared/searchbar/searchbar.component';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { appSettings } from '../../../settings/appsettings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-entrega',
  standalone: true,
  imports: [H1Component, Table2Component, SearchbarComponent, BtnComponent],
  templateUrl: './gestion-entrega.component.html',
  styleUrls: ['./gestion-entrega.component.css'],
})
export default class GestionEntregaComponent implements OnInit {
  entregas: any[] = [];
  columnas: string[] = [
    'appointment_date',
    'patient_name', // Agrega esta línea
    'patient_id_card',
    'expiration_date',
    'status',
  ];
  encabezados: string[] = [
    'Fecha de Entrega',
    'Nombre del Paciente', // Agrega esta línea
    'Cedula',
    'Fecha de Expiración',
    'Estado',
  ];

  verEntrega(item: any) {
    this.router.navigate([`gestionEntrega/${item.id}`]);
  }

  entregado(item: any) {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}delivery/changeDelivered/${item.id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ status: 'delivered' }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      })
      .then((json) => {
        console.log(json);
        // Elimina el elemento de la tabla
        this.entregas = this.entregas.filter(
          (entrega) => entrega.id !== item.id
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  expirado(item: any) {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}delivery/changeExpired/${item.id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ status: 'expired' }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      })
      .then((json) => {
        console.log(json);
        // Elimina el elemento de la tabla
        this.entregas = this.entregas.filter(
          (entrega) => entrega.id !== item.id
        );
        // Navega al elemento que se está dando a changeExpired
        this.router.navigate(['/gestion-expirado']);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  constructor(private ngZone: NgZone, private router: Router) {}

  ngOnInit(): void {
    this.getEntregas();
  }

  getEntregas() {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}delivery/getPending`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('Datos recibidos:', json); // Agrega este console.log
        this.ngZone.run(() => {
          this.entregas = json.data.Delivery.map((entrega: any) => ({
            id: entrega.id,
            appointment_date: new Date(entrega.appointment_date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            withdrawal_date: new Date(entrega.withdrawal_date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            treatment_id: entrega.treatment_id,
            patient_id: entrega.patient_id,
            patient_name: entrega.patient ? entrega.patient.first_name : '', // Agrega esta línea
            patient_id_card: entrega.patient ? entrega.patient.id_card : '', // Agrega esta línea
            expiration_date: new Date(entrega.expiration_date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            status: entrega.status,
          }));
        });
      });
  }
}
