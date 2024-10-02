import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar-input.component.html',
  styleUrls: ['./search-bar-input.component.css']
})
export class SearchBarInputComponent {
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
