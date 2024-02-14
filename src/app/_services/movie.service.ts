import { ListMoviesOutputDto } from './../../shared/service-proxies/proxies.service';
import { Injectable } from '@angular/core';
import { ProxiesService } from '../../shared/service-proxies/proxies.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { MoviesParams } from '../_models/movieParams';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl = environment.apiUrl;
  movies!: ListMoviesOutputDto[];
  constructor(private http: HttpClient, private _service: ProxiesService) {}

  getListsMovies(params: MoviesParams): Observable<ListMoviesOutputDto[]> {
    return this._service.getListMovies(
      params.keyword,
      params.orderBy,
      params.sortOrder,
      params.status,
      params.pageSize,
      params.certificationId,
      params.genreId,
      params.purpose
    );
  }

  addMovieToWatchlist(movieId: number) {
    return this.http.post(
      this.baseUrl + 'Watchlist/AddMovieToWatchList/' + movieId, {}
    );
  }
}
