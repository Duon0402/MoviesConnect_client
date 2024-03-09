import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { ProxiesService, UsersWithRolesDto } from '../../shared/service-proxies/proxies.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private _service: ProxiesService, private http: HttpClient) {}
  // roles

  getUsersWithRoles(username: any): Observable<UsersWithRolesDto[]> {
    return this._service.usersWithRoles(username);
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post(
      this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles,
      {}
    );
  }
}
