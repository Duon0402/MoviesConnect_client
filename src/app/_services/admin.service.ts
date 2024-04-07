import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import {
  Movie,
  ProxiesService,
  UsersWithRolesDto,
} from '../../shared/service-proxies/proxies.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private _service: ProxiesService, private http: HttpClient) {}
  // roles

  getUsersWithRoles(): Observable<UsersWithRolesDto[]> {
    return this._service.usersWithRoles();
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post(
      this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles,
      {}
    );
  }

  // movies

  getMovies(): Observable<Movie[]> {
    return this._service.movies();
  }

  getMovie() {}

  createOrEditMovie(data: any, movieId?: number) {
    if (movieId != null && movieId !== 0) {
      return this.http.put(this.baseUrl + 'Movie/UpdateMovie/' + movieId, data);
    } else {
      return this.http.post(this.baseUrl + 'Movie/CreateMovie', data);
    }
  }

  deleteMovie(movieId: number) {
    return this.http.delete(this.baseUrl + 'Movie/DeleteMovie/' + movieId)
  }
}
