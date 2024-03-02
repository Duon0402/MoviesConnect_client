import { Injectable } from '@angular/core';
import {
  AccountOutputDto
} from '../../shared/service-proxies/proxies.service';
import { ReplaySubject, map } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<AccountOutputDto | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  setCurrentUser(user: AccountOutputDto) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'Account/Login', model).pipe(
      map((response: AccountOutputDto) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'Account/Register', model).pipe(
      map((user: AccountOutputDto) => {
        if (user) {
         this.setCurrentUser(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/login');
  }

  changePass(model: any) {
    return this.http.put(this.baseUrl + 'Account/ChangePassword', model);
  }
}
