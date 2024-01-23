import { Injectable } from '@angular/core';
import { AccountOutputDto, ProxiesService } from '../../shared/service-proxies/proxies.service';
import { ReplaySubject, map } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new ReplaySubject<AccountOutputDto | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private _service: ProxiesService, private toastr: ToastrService, private router: Router) { }

  login(model: any) {
    return this._service.login(model).subscribe(
      (user: AccountOutputDto) => {
        this.toastr.success('Login Successful');
        this.setCurrentUser(user);
      },
      (error) => {
        this.toastr.error('Login Failed');
        console.error(error)
      }
    );
  }

  setCurrentUser(user: AccountOutputDto) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('');
  }
}
