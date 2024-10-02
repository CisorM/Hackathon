import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchBarInputComponent } from "../../../Shared/search-bar-input/search-bar-input.component";
import { CardDonanteComponent } from "../card-donante/card-donante.component";
import { CharityInterface } from '../../../Core/Interfaces/charity.interface';
import { CommonModule } from '@angular/common';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';

@Component({
  selector: 'app-lista-donante',
  standalone: true,
  imports: [SearchBarInputComponent, CardDonanteComponent, CommonModule],
  templateUrl: './lista-donante.component.html',
  styleUrls: ['./lista-donante.component.css']
})
export class ListaDonanteComponent implements OnInit {

  charities: CharityInterface[] | null = null;
  filteredCharities: CharityInterface[] = [];

  @Output() donanteSeleccionado = new EventEmitter<CharityInterface>();

  ngOnInit() {
    this.getDonantes();
  }

  seleccionarDonante(charity: CharityInterface) {
    this.donanteSeleccionado.emit(charity);
  }

  getDonantes() {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}charity/getAllActive`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        this.charities = data.data.Charity;
        this.filteredCharities = data;
        console.log(this.charities);
      })
      .catch((error) => {
        console.error('Error fetching donantes:', error);
      });
  }

  realizarBusqueda(busqueda: string) {
    if (this.charities) {
      this.filteredCharities = this.charities.filter(charity =>
        charity.identification.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
  }

  limpiarBusqueda() {
    this.filteredCharities = this.charities || []; // Restaura a charities si está disponible
  }
}
