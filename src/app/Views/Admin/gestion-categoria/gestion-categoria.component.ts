import { Component, OnInit, NgZone } from '@angular/core';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { TableComponent } from '../../../Shared/table/table.component';
import { Table2Component } from '../../../Shared/table2/table2.component';
import { H1Component } from '../../../Shared/h1/h1.component';
import { SearchbarComponent } from '../../../Shared/searchbar/searchbar.component';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestion-categoria',
  standalone: true,
  imports: [
    H1Component,
    BtnComponent,
    TableComponent,
    Table2Component,
    SearchbarComponent,
  ],
  templateUrl: './gestion-categoria.component.html',
  styleUrls: ['./gestion-categoria.component.css'],
})
export default class GestionCategoriaComponent implements OnInit {
  categories: any[] = [];
  filteredCategoria: any[] = [];

  columnas: string[] = ['name', 'description'];
  encabezados: string[] = ['Nombre', 'Descripción'];

  constructor(private ngZone: NgZone, private toastrService: ToastrService) {}

  ngOnInit(): void {
    console.log('holi');
    this.getPost();
  }

  getPost() {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}category/getAllActive`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data); // <--- Agrega esta línea para imprimir los datos en la consola
        this.ngZone.run(() => {
          this.categories = json.data.Category.slice(-10).reverse(); // <--- Cambia esto
        });
      });
  }

  filterCategories(search: string) {
    this.filteredCategoria = this.categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );

    console.log(this.filteredCategoria);
  }

  cleanSearch() {
    this.filteredCategoria = [];
  }

  editCategory(category: any) {
    alert(category.id);
  }

  deleteCategory(category: any) {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}category/delete/${category.id}`, {
      method: 'DELETE',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.ngZone.run(() => {
          this.toastrService.success('Categoría eliminada con éxito');
          this.getPost();
        });
      })
      .catch((error) => {
        console.error(error);
        this.ngZone.run(() => {
          this.toastrService.error('Error al eliminar la categoría', 'Error');
        });
      });
  }
}
