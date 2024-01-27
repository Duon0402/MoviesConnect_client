import { AccountService } from './../../_services/account.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginDto, ProxiesService } from '../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData!: LoginDto;

  constructor(
    private accountService: AccountService,
  ) { }
  ngOnInit(): void { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    this.loginData = this.loginForm.value as any;
    this.accountService.login(this.loginData);
  }
}
