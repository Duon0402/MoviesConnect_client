import { AccountOutputDto } from './../../../shared/service-proxies/proxies.service';
import { Component } from '@angular/core';
import { ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  newPassword!: string;
  oldPassword!: string;
  currentUser!: AccountOutputDto | null;

  constructor(
    private _service: ProxiesService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((currnetUser) => (this.currentUser = currnetUser));
  }

  changePassword() {
    this._service
      .changePassword(this.currentUser?.username, this.oldPassword, this.newPassword)
      .subscribe(
        () => {
          this.toastr.success('Password changed succesfully');
          this.accountService.logout();
          this.router.navigateByUrl('/login');
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
