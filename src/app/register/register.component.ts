import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  ProxiesService,
  RegisterDto,
} from '../../shared/service-proxies/proxies.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  registerData!: RegisterDto;

  constructor(
    private _service: ProxiesService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  register() {
    this._service.register(this.registerData).subscribe(
      (response) => {
        this.toastr.success('Register successful');
        this.router.navigateByUrl('');
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
