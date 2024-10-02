import { Component, OnInit } from '@angular/core';
import { H1Component } from '../../../Shared/h1/h1.component';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { SearchbarComponent } from '../../../Shared/searchbar/searchbar.component';
import { Table2Component } from '../../../Shared/table2/table2.component';
import { NgZone } from '@angular/core';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';

@Component({
  selector: 'app-devoluciones',
  standalone: true,
  imports: [H1Component, BtnComponent, SearchbarComponent, Table2Component],
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css'],
})
export default class DevolucionesComponent implements OnInit {
  devoluciones: any[] = [];
  columnas: string[] = ['patient_id', 'treatment_id', 'appointment_date', 'withdrawal_date', 'expiration_date', 'medications'];
  encabezados: string[] = ['Cedula', 'ID Tratamiento', 'Fecha de Cita', 'Fecha de Retiro', 'Fecha de Caducidad', 'Medicamentos'];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.getDevoluciones();
  }

  getDevoluciones() {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}delivery/getDeleted`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json); // <--- Agrega esta línea para imprimir los datos en la consola
        if (
          json &&
          json.data &&
          json.data.Delivery &&
          Array.isArray(json.data.Delivery)
        ) {
          this.ngZone.run(() => {
            this.devoluciones = json.data.Delivery;
          });
        } else {
          console.error('La API no devolvió un arreglo de devoluciones');
        }
      });
  }

  editDevolucion(devolucion: any) {
    alert(devolucion.patient_id);
  }

  deleteDevolucion(devolucion: any) {
    alert(devolucion.patient_id);
  }
}