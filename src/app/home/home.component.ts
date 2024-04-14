import { AccountService } from './../_services/account.service';
import { MovieService } from './../_services/movie.service';
import { Component, OnInit } from '@angular/core';
import { MoviesParams } from '../_models/movieParams';
import { AccountOutputDto, MovieOutputDto, ProxiesService } from '../../shared/service-proxies/proxies.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  newMovies: MoviesParams = {
    orderBy: 'release-date',
    sortOrder: 'desc',
    status: 'Released',
    pageSize: 10,
  };

  moviesComimgSoon: MoviesParams = {
    orderBy: 'release-date',
    sortOrder: 'asc',
    status: 'Released',
    pageSize: 10,
  };

  currentUser?: AccountOutputDto | null;

  genres: any[] = [];
  recommendMovies!: any[];
  constructor(
    private movieService: MovieService,
    private accountService: AccountService,
    private _service: ProxiesService
  ) {
    this.accountService.currentUser$
    .pipe(take(1))
    .subscribe((currentUser) => (this.currentUser = currentUser));
  }

  ngOnInit(): void {
    if(this.currentUser) {
      this.loadListRecommendMovies();
    }
    this.loadGenres();
  }

  loadGenres() {
    this.movieService.getListGenres().subscribe((result) => {
      this.genres = result;
    })
  }

  loadListRecommendMovies() {
    this._service.getListRecommendMovies().subscribe(result => {
      this.recommendMovies = result;
      this.chunkMovies(this.recommendMovies);
    })
  }

  movieChunks: MovieOutputDto[][] = [];
  chunkMovies(listMovies: any[]) {
    const chunkSize = 5;
    for (let i = 0; i < listMovies.length; i += chunkSize) {
      this.movieChunks.push(listMovies.slice(i, i + chunkSize));
    }
  }
}
