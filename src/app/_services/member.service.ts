import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ProxiesService } from '../../shared/service-proxies/proxies.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private _service: ProxiesService) { }

  changeAvatar(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.baseUrl + 'User/SetAvatar', formData);
  }

  getMemberById(userId: any){
    return this._service.getUserById(userId);
  }

  getMemberByUsername(username: any) {
    return this._service.getUserByUsername(username);
  }

  updateMember(model: any) {
    return this.http.put(this.baseUrl + 'User/UpdateUser', model);
  }
}
