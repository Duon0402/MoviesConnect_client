import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.css'
})
export class DateInputComponent {
  @Input() inputId = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() control = new FormControl();

  // config datepicker
  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-red',
    dateInputFormat: 'DD/MM/YYYY',
    // useUtc: true,
  }
  maxDate: Date = new Date();;
}
