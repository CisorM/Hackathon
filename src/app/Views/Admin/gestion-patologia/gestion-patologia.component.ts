import { Component, OnInit } from '@angular/core';
import { H1Component } from '../../../Shared/h1/h1.component';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { SearchbarComponent } from '../../../Shared/searchbar/searchbar.component';
import { Table2Component } from '../../../Shared/table2/table2.component';
import { NgZone } from '@angular/core';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';

@Component({
  selector: 'app-gestion-patologia',
  standalone: true,
  imports: [H1Component, BtnComponent, SearchbarComponent, Table2Component],
  templateUrl: './gestion-patologia.component.html',
  styleUrls: ['./gestion-patologia.component.css'],
})
export default class GestionPatologiaComponent implements OnInit {
  patologias: any[] = [];
  filteredPatologias: any[] = [];
  columnas: string[] = ['name'];
  encabezados: string[] = ['Nombre'];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.getPatologias();
  }

  getPatologias() {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}pathology/getAll`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        if (
          json &&
          json.data &&
          json.data.pathologies &&
          Array.isArray(json.data.pathologies)
        ) {
          const patologias = json.data.pathologies;
          const ultimos10 = patologias.slice(-10);
          this.ngZone.run(() => {
            this.patologias = ultimos10;
            this.filteredPatologias = this.patologias;
          });
        } else {
          console.error('La API no devolvió un arreglo de patologías');
        }
      });
  }

  filterPatologias(search: string) {
    this.filteredPatologias = this.patologias.filter(patologia =>
      patologia.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  cleanSearch() {
    this.filteredPatologias = this.patologias;
  }

  editPatologia(patologia: any) {
    alert(patologia.name);
  }

  deletePatologia(patologia: any) {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}pathology/delete/${patologia.id}`, {
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
          // Actualiza la lista de patologías
          this.getPatologias();
        });
      })
      .catch((error) => {
        console.error(error);
        this.ngZone.run(() => {
          // Muestra un mensaje de error
          alert('Error al eliminar la patología');
        });
      });
  }
}
