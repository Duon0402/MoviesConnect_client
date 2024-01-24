import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  AccountOutputDto,
  ProxiesService,
  RegisterDto,
} from '../../../shared/service-proxies/proxies.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerData!: RegisterDto;

  constructor(
    private _service: ProxiesService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    gender: new FormControl('Male'),
    dateOfBirth: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/
      ),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.matchValues('password'),
    ]),
  });

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      const parentControl = control?.parent as FormGroup;
      return control?.value === parentControl?.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
  }

  register() {
    this.registerData = this.registerForm.value as any;
    this._service.register(this.registerData).subscribe(
      () => {
        this.toastr.success('Register successful');
        this.router.navigateByUrl('/login');
      },
      (error) => {
        this.toastr.error('Register failed');
        console.error(error);
      }
    );
  }
}
