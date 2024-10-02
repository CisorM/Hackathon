import { Component, OnInit } from '@angular/core';
import { H1Component } from '../../../Shared/h1/h1.component';
import { CardComponent } from '../../../Shared/card/card.component';
import { NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { appSettings } from '../../../settings/appsettings';
import { z, ZodError } from 'zod';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-categoria',
  standalone: true,
  imports: [H1Component, CardComponent, FormsModule],
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css'],
})
export default class FormCategoriaComponent implements OnInit {
  private formSchema = z.object({
    name: z.string().min(1, { message: "El nombre de la categoría es obligatorio." }),
    description: z.string().optional(),
  });

  form: any = {
    name: '',
    description: '',
  };

  constructor(private ngZone: NgZone, private toastrService: ToastrService, private router: Router) {}

  ngOnInit(): void {}

  createCategory() {
    // Validar los datos de la categoría
    try {
      this.formSchema.parse(this.form);
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach((err) => {
          this.toastrService.error(`${err.message}`, 'Alerta');
        });
        return;
      }
    }

    const { headerPost } = getCookieHeader();
    fetch(`${appSettings.apiUrl}category/create`, {
      method: 'POST',
      headers: headerPost,
      body: JSON.stringify(this.form),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.ngZone.run(() => {
          this.toastrService.success('Categoría creada con éxito');
          this.form = {
            name: '',
            description: '',
          };
          this.router.navigate(['/gestionCategoria']); // Navegar a gestionCategoria
        });
      })
      .catch((error) => {
        console.error(error);
        this.ngZone.run(() => {
          this.toastrService.error('Error al crear la categoría', 'Error');
        });
      });
  }
}
