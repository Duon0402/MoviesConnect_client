import { MoviesParams } from './../../_models/movieParams';
import { MovieService } from './../../_services/movie.service';
import { Component, OnInit, Input } from '@angular/core';
import {
  ListMoviesOutputDto,
  ProxiesService,
} from '../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  moviesParams: MoviesParams = {};
  movies!: ListMoviesOutputDto[];

  constructor(private movieService: MovieService) {}
  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService
      .getListsMovies(this.moviesParams)
      .subscribe((movies: ListMoviesOutputDto[]) => (this.movies = movies));
  }

  resetFilter() {
    this.moviesParams = new MoviesParams();
  }

  filterMovies() {
    this.loadMovies();
  }
}
