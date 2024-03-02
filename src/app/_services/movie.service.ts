import {
  ListMoviesOutputDto,
  MovieOutputDto,
  RatingOutputDto,
} from './../../shared/service-proxies/proxies.service';
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
  watchlistMovieIds!: number[];
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
      params.purpose,
    );
  }

  getMovie(movieId: any): Observable<MovieOutputDto> {
    return this._service.getMovieById(movieId);
  }

  // watchlist
  addMovieToWatchlist(movieId: number) {
    return this.http.post(
      this.baseUrl + 'Watchlist/AddMovieToWatchList/' + movieId,
      {}
    );
  }

  removeMovieFromWatchlist(movieId: number) {
    return this.http.delete(
      this.baseUrl + 'Watchlist/RemoveMovieFromWatchlist/' + movieId
    );
  }

  getWatchList(userId: any): Observable<ListMoviesOutputDto[]> {
    return this._service.getListMoviesFromWatchlist(userId);
  }

  // ratings
  addOrEditRating(movieId: any, model: any) {
    return this.http.post(this.baseUrl + 'Rating/AddOrEditRating/' + movieId, model);
  }

  getRating(movieId: any): Observable<RatingOutputDto>{
    return this._service.getRating(movieId);
  }

  getListRatings(movieId: any): Observable<RatingOutputDto[]> {
    return this._service.getListRatings(movieId);
  }
}
