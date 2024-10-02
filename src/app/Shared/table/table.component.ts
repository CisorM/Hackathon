import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Tables } from '../../Core/Interfaces/tables';
import { TablesService } from '../../Core/Services/tables.service';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule, ToastModule, CommonModule, TagModule, DropdownModule,
    ButtonModule, InputTextModule, FormsModule
  ],
  providers: [MessageService, TablesService],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  tables!: Tables[];

  statuses!: SelectItem[];

  clonedTables: { [s: string]: Tables } = {};

  constructor(private tablesService: TablesService, private messageService: MessageService) {}
  // (resolved)? No se que hacer con este .then, altoque rey era un error de typeo
  async ngOnInit() {
    this.tablesService.getTablesMini().then((data: Tables[]) => {
      this.tables = data;
    });

    this.statuses = [
      { label: 'In Stock', value: 'IN_STOCK' },
      { label: 'Low Stock', value: 'LOW_STOCK' },
      { label: 'Out of Stock', value: 'OUT_OF_STOCK' }
    ];
  }

  onRowEditInit(table: Tables) {
    this.clonedTables[table.id as string] = { ...table };
  }

  onRowEditSave(table: Tables) {
    if (table.price && table.price > 0) {
      delete this.clonedTables[table.id as string];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }

  onRowEditCancel(table: Tables, index: number) {
    this.tables[index] = this.clonedTables[table.id as string];
    delete this.clonedTables[table.id as string];
  }

  getSeverity(status: string): "success" | "warning" | "danger" {
    switch (status) {
      case 'IN_STOCK':
        return 'success';
      case 'LOW_STOCK':
        return 'warning';
      case 'OUT_OF_STOCK':
        return 'danger';
      default:
        return 'danger'; // or any other default value from the allowed list
    }
  }
}
