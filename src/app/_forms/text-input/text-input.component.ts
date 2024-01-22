import { Component, Input, Self, input } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'], // Sửa styleUrl thành styleUrls
})
export class TextInputComponent {
  @Input() inputId = '';
  @Input() label = '';
  @Input() control = new FormControl();

  errorMessages: Record<string, string> = {
    required: 'The field is required',
  }

  constructor() {}
}
