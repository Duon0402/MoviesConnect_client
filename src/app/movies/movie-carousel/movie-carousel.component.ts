import { Component, Input, OnInit } from '@angular/core';
import {
  ListMoviesOutputDto,
  MovieOutputDto,
} from '../../../shared/service-proxies/proxies.service';
import { MoviesParams } from '../../_models/movieParams';
import { MovieService } from '../../_services/movie.service';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css',
})
export class MovieCarouselComponent implements OnInit {
  @Input() movieParams!: MoviesParams;
  @Input() id!: string;
  movies: MovieOutputDto[] = [];
  movieChunks: MovieOutputDto[][] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getListsMovies(this.movieParams).subscribe((movies) => {
      this.movies = movies;
      this.chunkMovies();
    });
  }

  chunkMovies() {
    const chunkSize = 5;
    for (let i = 0; i < this.movies.length; i += chunkSize) {
      this.movieChunks.push(this.movies.slice(i, i + chunkSize));
    }
  }
}
