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

  constructor() {}
}
