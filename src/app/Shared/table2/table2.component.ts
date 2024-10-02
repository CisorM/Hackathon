import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarInputComponent } from '../search-bar-input/search-bar-input.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-table2',
  standalone: true,
  imports: [CommonModule, SearchBarInputComponent, SearchbarComponent],
  templateUrl: './table2.component.html',
  styleUrls: ['./table2.component.css'],
})
export class Table2Component<T extends Record<string, any>> {
  // array of objects

  @Input()
  items: T[] = [];

  // array of columns to display

  @Input()
  columns: string[] = [];

  // array of column headers in Spanish

  @Input()
  columnHeaders: string[] = [];

  // emit events to capture in the parent

  @Input()
  showEdit: boolean = true;

  @Input()
  showDelete: boolean = true;

  @Input()
  showView: boolean = true;

  @Input()
  showProcesado: boolean = false;

  @Input()
  showExpirado: boolean = false;

  @Input()
  showEntregado: boolean = false;

  @Input()
  showCancelado: boolean = false;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() view = new EventEmitter<T>();
  @Output() procesado = new EventEmitter<T>();
  @Output() expirado = new EventEmitter<T>();
  @Output() entregado = new EventEmitter<T>();
  @Output() cancelado = new EventEmitter<T>();
}