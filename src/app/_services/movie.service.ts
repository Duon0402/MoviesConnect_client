import { Injectable } from '@angular/core';
import {
  ListMoviesOutputDto,
  ProxiesService,
} from '../../shared/service-proxies/proxies.service';
import { MoviesParams } from '../_models/movieParams';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private _service: ProxiesService) {}

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
}
