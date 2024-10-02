import { Component } from '@angular/core';
import { NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { H1Component } from '../../../Shared/h1/h1.component';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { z, ZodError } from 'zod';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-comunidad',
  standalone: true,
  imports: [FormsModule, H1Component],
  templateUrl: './form-comunidad.component.html',
  styleUrls: ['./form-comunidad.component.css'],
})
export default class FormComunidadComponent {
  private formSchema = z.object({
    nombre: z.string().min(1, { message: "El nombre de la comunidad es obligatorio." }),
    region: z.string().min(1, { message: "La región es obligatoria." }),
  });

  form: any = {
    nombre: '',
    region: '',
  };

  constructor(private ngZone: NgZone, private toastrService: ToastrService, private router: Router) {}

  createComunidad(): void {
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

    const comunidad = {
      name: this.form.nombre,
      region: this.form.region,
    };

    const { headerPost } = getCookieHeader();
    fetch(`${appSettings.apiUrl}community/create`, {
      method: 'POST',
      headers: headerPost,
      body: JSON.stringify(comunidad),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.ngZone.run(() => {
          this.toastrService.success('Comunidad creada con éxito');
          this.form = {
            nombre: '',
            region: '',
          };
          this.router.navigate(['/gestionComunidad']); // Redirigir a gestionComunidad
        });
      })
      .catch((error) => {
        console.error(error); // Log the error
        this.ngZone.run(() => {
          this.toastrService.error('Error al crear la comunidad', 'Error');
        });
      });
  }
}