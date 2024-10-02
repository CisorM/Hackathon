import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccesoService } from '../../Core/Services/auth.service';
import { Login } from '../../Core/Interfaces/admin.interface';
import { CardComponent } from '../../Shared/card/card.component';
import { InputPasswordComponent } from '../../Shared/input-password/input-password.component';
import { BtnComponent } from '../../Shared/btn/btn.component';
import { CardModule } from 'primeng/card';
import { setCookie } from './cookies';
import { InputTextComponent } from '../../Shared/input-text/input-text.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardComponent,
    InputPasswordComponent,
    InputTextComponent,
    BtnComponent,
    FormsModule,
    CardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  constructor(private toastrService: ToastrService) {}

  private accesoService = inject(AccesoService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  iniciarSesion() {
    if (this.formLogin.invalid) return;

    const objeto: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };

    this.accesoService.login(objeto).subscribe({
      next: (data) => {
        if (data.data.Admin) {
          setCookie('access_token', data.data.token);
          this.router.navigate(['DashboardDoner']);
        } else {
          this.toastrService.error('Las Credenciales son incorrectas');
        }
      },
      error: (error) => {
        this.toastrService.error('Las Credenciales son incorrectas');
        console.log(error.message);
      },
    });
  }
}
