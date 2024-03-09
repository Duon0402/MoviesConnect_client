import { GenreOutputDto } from './../../../shared/service-proxies/proxies.service';
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
  genres!: GenreOutputDto[];
  movieParams: MoviesParams = {
    keyword: '',
    genreId: [],
  };
  movies!: ListMoviesOutputDto[];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadGenres();
  }

  loadMovies() {
    this.movieService
      .getListsMovies(this.movieParams)
      .subscribe((movies: ListMoviesOutputDto[]) => (this.movies = movies));
  }

  loadGenres() {
    this.movieService.getListGenres().subscribe((genres) => {
      this.genres = genres;
    });
  }

  resetFilter() {
    this.movieParams = {
      keyword: '',
      genreId: [],
    };
    this.loadMovies();
  }

  filterMovies() {
    this.loadMovies();
  }
}
