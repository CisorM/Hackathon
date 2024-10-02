import { Component, OnInit } from '@angular/core';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { TableComponent } from '../../../Shared/table/table.component';
import { Table2Component } from '../../../Shared/table2/table2.component';
import { H1Component } from '../../../Shared/h1/h1.component';
import { SearchbarComponent } from '../../../Shared/searchbar/searchbar.component';
import { NgZone } from '@angular/core';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { appSettings } from '../../../settings/appsettings';

@Component({
  selector: 'app-gestion-comunidad',
  standalone: true,
  imports: [
    H1Component,
    BtnComponent,
    TableComponent,
    Table2Component,
    SearchbarComponent,
  ],
  templateUrl: './gestion-comunidad.component.html',
  styleUrls: ['./gestion-comunidad.component.css'],
})
export default class GestionComunidadComponent implements OnInit {
  comunidades: any[] = [];
  filteredComunidad: any[] = [];
  columnas: string[] = ['name', 'region'];
  encabezados: string[] = ['Nombre', 'Región'];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}community/getAll`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        this.ngZone.run(() => {
          this.comunidades = json.data.Community;
          this.filteredComunidad = this.comunidades.slice(-10).reverse(); // Obtener los últimos 10 elementos en orden inverso
        });
        console.log(json);
      });
  }

  filterComunidades(search: string) {
    this.filteredComunidad = this.comunidades.filter((comunidad) =>
      comunidad.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  cleanSearch() {
    this.filteredComunidad = this.comunidades;
  }

  deleteComunidad($event: any) {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}community/delete/${$event.id}`, {
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
          // Actualiza la lista de comunidades
          this.getPost();
        });
      })
      .catch((error) => {
        console.error(error);
        this.ngZone.run(() => {
          // Muestra un mensaje de error
          alert('Error al eliminar la comunidad');
        });
      });
  }

  editComunidad($event: any) {
    alert(`Editar comunidad con ID: ${$event.id}`);
  }
}
