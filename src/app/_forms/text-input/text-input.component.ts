import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
})
export class TextInputComponent {
  @Input() inputId = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() control = new FormControl();

  errorMessages: Record<string, string> = {
    required: 'The field is required',
    isMatch: 'The password is not match',
  }

  constructor() {}
}
