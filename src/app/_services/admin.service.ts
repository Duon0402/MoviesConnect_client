import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import {
  Movie,
  MovieCreateDto,
  MovieUpdateDto,
  ProxiesService,
  ReportDto,
  ReportUpdateDto,
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

  changeBanner(file: File, movieId: any) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(
      this.baseUrl + 'Movie/SetBanner/' + movieId,
      formData
    );
  }

  createOrEditMovie(
    movieData: MovieCreateDto | MovieUpdateDto,
    movieId?: number
  ) {
    if (movieId != null && movieId !== 0) {
      return this.http.put(
        this.baseUrl + 'Movie/UpdateMovie/' + movieId,
        movieData
      );
    } else {
      return this.http.post(this.baseUrl + 'Movie/CreateMovie', movieData);
    }
  }

  deleteMovie(movieId: number) {
    return this.http.delete(this.baseUrl + 'Movie/DeleteMovie/' + movieId);
  }

  getReports(): Observable<ReportDto[]> {
    return this._service.getListReports();
  }

  getReport(reportId: number) {
    return this._service.getReport(reportId);
  }

  updateStatusReport(
    reportId: number,
    reportUpdateDto: ReportUpdateDto
  ): Observable<any> {
    return this.http.put(
      this.baseUrl + 'Report/UpdateStatusReport/' + reportId,
      reportUpdateDto
    );
  }

  deleteRating(userId: number, movieId: number) {
    return this.http.delete(
      this.baseUrl +
        'Admin/DeleteRating?userId=' +
        userId +
        '&movieId=' +
        movieId
    );
  }

  updateStatusRating(userId: number, movieId: number, isViolation: boolean) {
    return this.http.put(
      this.baseUrl +
        'Admin/DeleteRating?userId=' +
        userId +
        '&movieId=' +
        movieId +
        '&isViolation=' +
        isViolation,
      {}
    );
  }

  loadRating(userId: number, movieId: number) {
    return this._service.getRatingForHandle(userId, movieId);
  }
}
