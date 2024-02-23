import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { MemberProfileEditComponent } from '../members/member-profile-edit/member-profile-edit.component';

@Injectable({
  providedIn: 'root'
})

// Hoan thanh sau

export class PreventUnsaveChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: unknown, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
}
