import { Component, OnInit, NgZone } from '@angular/core';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { TableComponent } from '../../../Shared/table/table.component';
import { Table2Component } from '../../../Shared/table2/table2.component';
import { H1Component } from '../../../Shared/h1/h1.component';
import { SearchbarComponent } from '../../../Shared/searchbar/searchbar.component';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-donante',
  standalone: true,
  imports: [
    H1Component,
    BtnComponent,
    TableComponent,
    Table2Component,
    SearchbarComponent,
  ],
  templateUrl: './gestion-donante.component.html',
  styleUrls: ['./gestion-donante.component.css'],
})
export default class GestionDonanteComponent implements OnInit {
  donantes: any[] = [];
  filteredDonantes: any[] = [];
  columnas: string[] = ['razon_social', 'indentification_type', 'identification', 'is_fundation'];
  encabezados: string[] = ['Razón Social', 'Tipo de Identificación', 'Cédula', 'Es Fundación'];

  constructor(private ngZone: NgZone, private router: Router) {}

  ngOnInit(): void {
    this.getDonantes();
  }

  getDonantes() {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}charity/getAllActive`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        this.ngZone.run(() => {
          this.donantes = json.data.Charity;
          this.filteredDonantes = this.donantes;
        });
      });
  }

  filterDonantes(search: string) {
    this.filteredDonantes = this.donantes.filter(donante =>
      donante.identification.toString().includes(search)
    );
  }

  cleanSearch() {
    this.filteredDonantes = this.donantes;
  }

  editDonante(donante: any) {
    alert(donante.razon_social);
  }

  deleteDonante(donante: any) {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}charity/delete/${donante.id}`, {
      method: 'DELETE',
      headers: headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      })
      .then((json) => {
        console.log(json);
        this.ngZone.run(() => {
          // Actualiza la lista de donantes
          this.getDonantes();
        });
      })
      .catch((error) => {
        console.error(error);
        this.ngZone.run(() => {
          // Muestra un mensaje de error
          alert('Error al eliminar el donante');
        });
      });
  }

  viewDonante(donante: any) {
    this.router.navigate(['perfilDonador/', donante.id]);
  }
}
