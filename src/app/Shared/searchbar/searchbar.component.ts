import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { BtnComponent } from "../btn/btn.component";

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [InputIconModule, IconFieldModule, InputTextModule, FormsModule, BtnComponent],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  @Input()
  placeholder: string = '';

  @Output()
  search = new EventEmitter<string>();

  @Output()
  clean = new EventEmitter<void>();

  searchTerm: string = '';

  realizarBusqueda(event: Event) {
    event.preventDefault();
    this.search.emit(this.searchTerm);
    this.searchTerm = '';
  }

  limpiarBusqueda() {
    this.searchTerm = '';
    this.clean.emit();
  }
}
