import { Component, NgZone } from '@angular/core';
import { H1Component } from '../../../Shared/h1/h1.component';
import { CardComponent } from '../../../Shared/card/card.component';
import { InputTextComponent } from '../../../Shared/input-text/input-text.component';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { FormsModule } from '@angular/forms';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { Admin } from '../../../Core/Interfaces/admin.interface';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { z } from 'zod';

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [
    CommonModule,
    H1Component,
    CardComponent,
    InputTextComponent,
    BtnComponent,
    FormsModule,
  ],
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css'],
})
export default class FormUserComponent {
  form: Admin = {
    first_name: '',
    last_name: '',
    email: '',
    id_card_prefix: '',
    id_card: '',
    password: '',
    confirm_password: '',
    userType: 'donor',
    razon_social: '',
    description: '',
    is_fundation: false,
  };

  private userSchema = z.object({
    first_name: z.string().min(1, 'El primer nombre es requerido'),
    last_name: z.string().min(1, 'El apellido es requerido'),
    email: z.string().email('El correo electrónico no es válido'),
    id_card_prefix: z.string().min(1, 'El prefijo de la cédula es requerido'),
    id_card: z.string()
      .min(1, 'La cédula es requerida')
      .regex(/^\d+$/, 'La cédula debe contener solo números'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirm_password: z.string().min(6, 'La confirmación de la contraseña debe tener al menos 6 caracteres'),
    razon_social: z.string().optional(),
    description: z.string().optional(),
  });

  selectUserType(type: 'admin' | 'donor') {
    this.form.userType = type;
  }

  constructor(private ngZone: NgZone, private toastrService: ToastrService) {}

  createUser(): void {
    const validationResult = this.userSchema.safeParse({
      ...this.form,
      cedula: this.form.id_card_prefix + this.form.id_card,
    });

    if (!validationResult.success) {
      validationResult.error.errors.forEach((error) => {
        this.toastrService.error(error.message, 'Error');
      });
      return;
    }

    if (this.form.userType === 'donor') {
      if (!this.form.razon_social || this.form.razon_social.trim().length === 0) {
        this.toastrService.error('La razón social es requerida para el tipo de usuario "donor"', 'Error');
        return;
      }
      if (!this.form.description || this.form.description.trim().length === 0) {
        this.toastrService.error('La descripción es requerida para el tipo de usuario "donor"', 'Error');
        return;
      }
    }

    if (this.form.password !== this.form.confirm_password) {
      this.toastrService.error('Las contraseñas no coinciden', 'Error');
      return;
    }

    const user = {
      first_name: this.form.first_name,
      last_name: this.form.last_name,
      email: this.form.email,
      cedula: this.form.id_card_prefix + this.form.id_card,
      password: this.form.password,
      userType: this.form.userType,
      ...(this.form.userType === 'donor' && {
        razon_social: this.form.razon_social,
        description: this.form.description,
        is_fundation: this.form.is_fundation,
      }),
    };

    console.log(user)

    const { headerPost } = getCookieHeader();
    fetch(`${appSettings.apiUrl}admin/create`, {
      method: 'POST',
      headers: headerPost,
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.ngZone.run(() => {
          this.toastrService.success('Usuario creado con éxito', 'Éxito');
          this.form = {
            first_name: '',
            last_name: '',
            email: '',
            id_card: '',
            id_card_prefix: 'V-',
            password: '',
            confirm_password: '',
            userType: 'admin',
            razon_social: '',
            description: '',
            is_fundation: false,
          };
        });
      })
      .catch((error) => {
        console.error(error); // Log the error
        this.ngZone.run(() => {
          this.toastrService.error('Error al crear el usuario', 'Error');
        });
      });
  }
}
