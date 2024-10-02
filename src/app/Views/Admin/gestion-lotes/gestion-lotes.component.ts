import { Component, OnInit, NgZone } from '@angular/core';
import { H1Component } from '../../../Shared/h1/h1.component';
import { Table2Component } from '../../../Shared/table2/table2.component';
import { SearchbarComponent } from '../../../Shared/searchbar/searchbar.component';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';

@Component({
  selector: 'app-gestion-lotes',
  standalone: true,
  imports: [H1Component, Table2Component, SearchbarComponent, BtnComponent],
  templateUrl: './gestion-lotes.component.html',
  styleUrls: ['./gestion-lotes.component.css'],
})
export default class GestionLotesComponent implements OnInit {
  lotes: any[] = [];
  filteredLotes: any[] = [];
  columnas: string[] = ['medication_id', 'expiration_date', 'quantity'];
  encabezados: string[] = ['Medicamento', 'Fecha de Caducidad', 'Cantidad'];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.getLotes();
  }

  getLotes() {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}medication_expiration/getAll`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('Datos recibidos:', json); // Agrega este console.log
        this.ngZone.run(() => {
          this.lotes = json.data.MedicationExpirationDate.slice(0, 20).map((lote: { expiration_date: string | number | Date; }) => {
            return {
              ...lote,
              expiration_date: new Date(lote.expiration_date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
            };
          });
          this.filteredLotes = this.lotes;
        });
      });
  }
  
  deleteLote(lote: any) {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}medication_expiration/delete/${lote.id}`, {
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
          // Actualiza la lista de lotes
          this.getLotes();
        });
      })
      .catch((error) => {
        console.error(error);
        this.ngZone.run(() => {
          // Muestra un mensaje de error
          alert('Error al eliminar el lote');
        });
      });
  }

  filterLotes(search: string) {
    console.log(this.filteredLotes);
    this.filteredLotes = this.lotes.filter(
      (lote) =>
        lote.medication.name.toLowerCase().includes(search.toLowerCase()) // Filtra por nombre de medicamento
    );
  }

  cleanSearch() {
    this.filteredLotes = this.lotes;
  }
}
