import { Component, NgZone } from '@angular/core';
import { H1Component } from '../../../Shared/h1/h1.component';
import { CardComponent } from '../../../Shared/card/card.component';
import { InputTextComponent } from '../../../Shared/input-text/input-text.component';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { FormsModule } from '@angular/forms';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { z, ZodError } from 'zod';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-paciente',
  standalone: true,
  imports: [
    CommonModule,
    H1Component,
    CardComponent,
    InputTextComponent,
    BtnComponent,
    FormsModule,
  ],
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.css'],
})
export default class FormPacienteComponent {
  private formSchema = z.object({
    first_name: z.string().min(1, { message: 'El nombre es obligatorio.' }),
    last_name: z.string().min(1, { message: 'El apellido es obligatorio.' }),
    birth_date: z.string().refine(
      (dateStr) => {
        const birthDate = new Date(dateStr);
        const today = new Date();
        return birthDate < today;
      },
      { message: 'La fecha de nacimiento debe ser anterior a la fecha actual.' }
    ),
    email: z.string().email({ message: 'El correo electrónico no es válido.' }),
    id_card_prefix: z
      .string()
      .min(1, { message: 'El prefijo de la cédula es obligatorio.' }),
    id_card: z
      .string()
      .min(1, { message: 'El número de cédula es obligatorio.' }),
    phone: z.string().min(1, { message: 'El teléfono es obligatorio.' }),
    address: z.string().min(1, { message: 'La dirección es obligatoria.' }),
    gender: z.string().min(1, { message: 'El género es obligatorio.' }),
    economic_status: z
      .string()
      .min(1, { message: 'El estado económico es obligatorio.' }),
    pathology_description: z
      .string()
      .min(1, { message: 'La descripción de la patología es obligatoria.' }),
    vulnerability_level: z
      .string()
      .min(1, { message: 'El nivel de vulnerabilidad es obligatorio.' }),
  });

  form: any = {
    first_name: '',
    last_name: '',
    birth_date: '',
    email: '',
    id_card_prefix: '',
    id_card: '',
    phone: '',
    address: '',
    gender: '',
    economic_status: '',
    pathology_description: '',
    vulnerability_level: '',
  };

  pathologies: any[] = [];

  constructor(
    private ngZone: NgZone,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPathologies();
  }

  getPathologies(): void {
    const { headers } = getCookieHeader();
    fetch(`${appSettings.apiUrl}pathology/getAll`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.pathologies = json.data.pathologies
          .slice(0, 5)
          .map((pathology: { id: any; name: any }) => ({
            id: pathology.id,
            name: pathology.name,
            selected: false,
          }));
      });
  }

  updatePathologies(): void {
    const selectedPathologies = this.pathologies.filter(
      (pathology) => pathology.selected
    );
    console.log(selectedPathologies);
  }

  createPaciente(): void {
    const birthDate = new Date(this.form.birth_date);
    const today = new Date();

    if (isNaN(birthDate.getTime()) || birthDate > today) {
      this.toastrService.error(
        'La fecha de nacimiento debe ser anterior a la fecha actual.',
        'Alerta'
      );
      return;
    }

    if (isNaN(Number(this.form.id_card))) {
      this.toastrService.error(
        'El número de cédula debe ser un número.',
        'Alerta'
      );
      return;
    }

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

    const paciente = {
      first_name: this.form.first_name,
      last_name: this.form.last_name,
      birth_date: this.form.birth_date,
      email: this.form.email,
      cedula: this.form.id_card_prefix + this.form.id_card,
      id_card: this.form.id_card,
      phone: this.form.phone,
      address: this.form.address,
      gender: this.form.gender,
      economic_status: this.form.economic_status,
      community_id: 1,
      pathologies: this.pathologies
        .filter((pathology) => pathology.selected)
        .map((pathology) => ({
          id_pathology: pathology.id,
          description: this.form.pathology_description,
        })),
      vulnerability_level: this.form.vulnerability_level,
    };

    const { headerPost } = getCookieHeader();
    fetch(`${appSettings.apiUrl}patient/create`, {
      method: 'POST',
      headers: headerPost,
      body: JSON.stringify(paciente),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.ngZone.run(() => {
          this.form = {
            first_name: '',
            last_name: '',
            birth_date: '',
            email: '',
            id_card_prefix: 'V-',
            id_card: '',
            phone: '',
            address: '',
            gender: '',
            economic_status: '',
            pathology_description: '',
            vulnerability_level: '',
          };
        });
        this.router.navigate(['/gestionPaciente']);
      })
      .catch((error) => {
        console.error(error);
        this.ngZone.run(() => {
          alert('Error al crear el paciente');
        });
      });
  }
}
