import { Component, OnInit } from '@angular/core';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { TableComponent } from '../../../Shared/table/table.component';
import { H1Component } from '../../../Shared/h1/h1.component';
import { SearchbarComponent } from '../../../Shared/searchbar/searchbar.component';
import { Table2Component } from '../../../Shared/table2/table2.component';
import { NgZone } from '@angular/core';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';

@Component({
  selector: 'app-medicamentos',
  standalone: true,
  imports: [
    H1Component,
    BtnComponent,
    TableComponent,
    SearchbarComponent,
    Table2Component,
  ],
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css'],
})
export default class MedicamentosComponent implements OnInit {
  medicamentos: any[] = [];
  filteredMedicamentos: any[] = [];
  columnas: string[] = ['name', 'quantity'];
  encabezados: string[] = ['Nombre', 'Cantidad'];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.getMedicamentos();
  }

  getMedicamentos() {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}medication/getAll`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        if (
          json &&
          json.data &&
          json.data.Medication &&
          Array.isArray(json.data.Medication)
        ) {
          this.ngZone.run(() => {
            this.medicamentos = json.data.Medication.slice(0, 10);
            this.filteredMedicamentos = this.medicamentos;
          });
        } else {
          console.error('La API no devolvió un arreglo de medicamentos');
        }
      });
  }

  filterMedicamentos(search: string) {
    this.filteredMedicamentos = this.medicamentos.filter(medicamento =>
      medicamento.name.toLowerCase().includes(search.toLowerCase()) // Filtra por nombre
    );
  }

  cleanSearch() {
    this.filteredMedicamentos = this.medicamentos;
  }

  editMedicamento(medicamento: any) {
    alert(medicamento.name);
  }

  deleteMedicamento(medicamento: any) {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}medication/delete/${medicamento.id}`, {
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
          // Actualiza la lista de medicamentos
          this.getMedicamentos();
        });
      })
      .catch((error) => {
        console.error(error);
        this.ngZone.run(() => {
          // Muestra un mensaje de error
          alert('Error al eliminar el medicamento');
        });
      });
  }
}
