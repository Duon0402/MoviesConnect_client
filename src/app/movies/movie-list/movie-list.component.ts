import { MoviesParams } from './../../_models/movieParams';
import { MovieService } from './../../_services/movie.service';
import { Component, OnInit } from '@angular/core';
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
  movies: ListMoviesOutputDto[] = [];

  constructor(
    private _service: ProxiesService,
    private movieService: MovieService
  ) {}
  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getListsMovies(this.moviesParams).subscribe(
      (movies) => {
        this.movies = movies;
      },
      (error) => {
        console.error('Error loading movies:', error);
      }
    );
  }
}
