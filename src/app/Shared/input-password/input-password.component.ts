import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [FormsModule, PasswordModule, FloatLabelModule],
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.css']
})
export class InputPasswordComponent {
  value!: string;
}