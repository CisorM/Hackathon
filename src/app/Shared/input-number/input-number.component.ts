import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [FormsModule, InputTextModule, FloatLabelModule],
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent {
  @Input() label: string = '';
  value: number | undefined;
}