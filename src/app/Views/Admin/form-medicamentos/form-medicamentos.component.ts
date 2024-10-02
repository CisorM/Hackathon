//

import { Component } from '@angular/core';
import { NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { H1Component } from '../../../Shared/h1/h1.component';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { z, ZodError } from 'zod';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-medicamentos',
  standalone: true,
  imports: [FormsModule, H1Component],
  templateUrl: './form-medicamentos.component.html',
  styleUrls: ['./form-medicamentos.component.css'],
})
export default class FormMedicamentosComponent {
  private medicamentoSchema = z.object({
    name: z.string().min(1, { message: "El nombre del medicamento es obligatorio." }),
    quantity: z.number().int().positive({ message: "La cantidad debe ser un número positivo." }),
  });

  medicamento = {
    name: '',
    quantity: 0,
  };

  constructor(private ngZone: NgZone, private toastrService: ToastrService) {}

  createMedicamento() {
    // Validar los datos del medicamento
    try {
      this.medicamentoSchema.parse(this.medicamento);
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach((err) => {
          this.toastrService.error(`${err.message}`, 'Alerta');
        });
        return;
      }
    }

    const { headerPost } = getCookieHeader();
    fetch(`${appSettings.apiUrl}medication/create`, {
      method: 'POST',
      headers: headerPost,
      body: JSON.stringify(this.medicamento),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json); // Log the response from the API
        if (json.message === 'Contact the administrator: error') {
          this.toastrService.error("Error al crear el medicamento", 'Error');
        } else {
          this.toastrService.success("Medicamento creado con éxito");
          this.medicamento = {
            name: '',
            quantity: 0,
          };
        }
      })
      .catch((error) => {
        console.error(error); // Log the error
        this.toastrService.error("Error al crear el medicamento", 'Error');
      });
  }
}
