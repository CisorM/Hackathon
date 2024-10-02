// input-email.component.ts
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-email',
  standalone: true,
  imports: [FormsModule, InputTextModule, FloatLabelModule, CommonModule],
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.css']
})
export class InputEmailComponent {
  value: string | undefined;
}