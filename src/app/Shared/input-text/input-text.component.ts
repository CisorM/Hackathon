import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [FormsModule, InputTextModule, FloatLabelModule, ReactiveFormsModule], // Add ReactiveFormsModule here
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() label: string = '';
  value: string | undefined;

  onChange: ((value: string) => void) | undefined;
  onTouched: (() => void) | undefined;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: any): void {
    this.value = event.target.value;
    if (this.onChange && this.value !== undefined) {
      this.onChange(this.value);
    }
  }
}