import {
  AccountOutputDto,
  ChangePasswordDto,
} from './../../../shared/service-proxies/proxies.service';
import { Component } from '@angular/core';
import { ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map, take } from 'rxjs';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  currentUser!: AccountOutputDto | null;
  changePassData!: ChangePasswordDto;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((currnetUser) => (this.currentUser = currnetUser));
  }

  changePassForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/
      ),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.matchValues('newPassword'),
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

  changePassword() {
    this.changePassData = this.changePassForm.value as any;
    this.accountService.changePass(this.changePassData).subscribe(() => {
      this.toastr.success('Password changed successful');
      this.accountService.logout();
      this.router.navigateByUrl('/login');
    });
  }
}
