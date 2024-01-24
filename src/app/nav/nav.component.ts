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
  constructor(public accountService: AccountService) {}

  logout() {
    this.accountService.logout();
  }
}
