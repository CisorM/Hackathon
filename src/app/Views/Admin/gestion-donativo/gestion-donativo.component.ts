// gestion-donativo.component.ts
import { Component, OnInit, NgZone } from '@angular/core';
import { H1Component } from '../../../Shared/h1/h1.component';
import { Table2Component } from '../../../Shared/table2/table2.component';
import { SearchbarComponent } from '../../../Shared/searchbar/searchbar.component';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-donativo',
  standalone: true,
  imports: [H1Component, Table2Component, SearchbarComponent, BtnComponent],
  templateUrl: './gestion-donativo.component.html',
  styleUrls: ['./gestion-donativo.component.css'],
})
export default class GestionDonativoComponent implements OnInit {
  deleteDonativo($event: any) {
    throw new Error('Method not implemented.');
  }

  editDonativo($event: any) {
    throw new Error('Method not implemented.');
  }

  donativos: any[] = [];
  columnas: string[] = [
    'id',
    'descripcion',
    'createdAt',
    'categoria',
    'charity',
  ];
  encabezados: string[] = [
    'ID',
    'Descripción',
    'Fecha de Creación',
    'Categoría',
    'Razón Social',
  ];

  verDonativo(item: any) {
    this.router.navigate([`gestionDonativo/${item.id}`]);
  }
  constructor(private ngZone: NgZone, private router: Router) {}

  ngOnInit(): void {
    this.getDonativos();
  }

  getDonativos() {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}donation/getAll`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json); // <--- Agrega esta línea para imprimir los datos en la consola
        this.ngZone.run(() => {
          this.donativos = json.data.Donation.map(
            (donation: {
              id: any;
              description: any;
              createdAt: any;
              category: { name: any };
              charity: { razon_social: any };
            }) => ({
              id: donation.id,
              descripcion: donation.description.substring(0, 150), // <--- Limita la longitud de la descripción a 150 caracteres
              createdAt: new Date(donation.createdAt).toLocaleDateString(
                'es-ES',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              ),
              categoria: donation.category.name,
              charity: donation.charity.razon_social, // <--- Extract razon social from charity object
            })
          );
        });
      });
  }
}
