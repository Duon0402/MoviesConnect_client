import { GenreOutputDto } from './../../../shared/service-proxies/proxies.service';
import { MoviesParams } from './../../_models/movieParams';
import { MovieService } from './../../_services/movie.service';
import { Component, OnInit } from '@angular/core';
import {
  ListMoviesOutputDto
} from '../../../shared/service-proxies/proxies.service';
import { DropdownItem } from '../../_models/dropdownItem';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  genres!: DropdownItem[];
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
    this.movieService.getListGenres().subscribe((genres: GenreOutputDto[]) => {
      const dropdownItems: DropdownItem[] = genres.map(genre => ({
        item_id: genre.id || 0,
        item_text: genre.name || ''
      }));

      this.genres = dropdownItems;
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
