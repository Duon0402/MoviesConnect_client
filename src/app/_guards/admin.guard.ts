import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private acountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.acountService.currentUser$.pipe(
      map((user) => {
        if (
          user?.roles?.includes('Admin') ||
          user?.roles?.includes('Moderator')
        ) {
          return true;
        }
        this.toastr.error('You cannot enter this area');
        return false;
      })
    );
  }
}
