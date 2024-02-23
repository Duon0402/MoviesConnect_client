import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ProxiesService } from '../../shared/service-proxies/proxies.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private _service: ProxiesService) { }

  changeAvatar(file: any) {
    return this.http.post(this.baseUrl + '/User/SetAvatar', file);
  }

  getMemberById(userId: any){
    return this._service.getUserById(userId);
  }
}
