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
  selector: 'app-gestion-desecho',
  standalone: true,
  imports: [
    H1Component,
    BtnComponent,
    TableComponent,
    Table2Component,
    SearchbarComponent,
  ],
  templateUrl: './gestion-desecho.component.html',
  styleUrls: ['./gestion-desecho.component.css'],
})
export default class GestionDesechoComponent implements OnInit {
  desechos: any[] = [];
  filteredDesechos: any[] = [];
  columnas: string[] = ['nombre', 'cantidadDesechada', 'razon'];
  encabezados: string[] = ['Nombre', 'Cantidad Desechada', 'Razón'];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}medication_disposal/getAll`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        const desechos = json.data.MedicationDisposal;
        const medicamentos: { nombre: any; cantidadDesechada: any; razon: any; }[] = [];
        desechos.forEach((desecho: { medication_id: any; medication: any; quantity: any; reason: any; }) => {
          const medicamentoId = desecho.medication_id;
          const medicamento = desecho.medication;
          if (medicamento) {
            medicamentos.push({
              nombre: medicamento.name,
              cantidadDesechada: desecho.quantity,
              razon: desecho.reason.length > 150 ? desecho.reason.substring(0, 150) + '...' : desecho.reason,
            });
          }
        });
        this.ngZone.run(() => {
          this.desechos = medicamentos.slice(-10);
          this.filteredDesechos = this.desechos;
        });
      });
  }

  filterDesechos(search: string) {
    this.filteredDesechos = this.desechos.filter(desecho =>
      desecho.nombre.toLowerCase().includes(search.toLowerCase())
    );
  }

  cleanSearch() {
    this.filteredDesechos = this.desechos;
  }

  deleteDesecho($event: any) {
    alert(`Eliminar desecho con ID: ${$event.id}`);
  }

  editDesecho($event: any) {
    alert(`Editar desecho con ID: ${$event.id}`);
  }
}
