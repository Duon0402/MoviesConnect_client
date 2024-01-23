import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { LoginDto } from '../../shared/service-proxies/proxies.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  loginData: LoginDto = {
    username: '',
    password: '',
  };

  constructor(public accountService: AccountService) {}

  login() {
    this.accountService.login(this.loginData);
  }

  logout() {
    this.accountService.logout();
    this.loginData.username = '';
    this.loginData.password = '';
  }
}
