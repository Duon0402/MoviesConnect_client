import { Component, Input } from '@angular/core';
import {
  ListMoviesOutputDto,
  ProxiesService,
} from '../../../shared/service-proxies/proxies.service';
import { ToastrService } from 'ngx-toastr';
import { MovieService } from '../../_services/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() movie!: ListMoviesOutputDto;

  constructor(
    private movieService: MovieService,
    private toastr: ToastrService
  ) {}

  addWatchlist(movieId: any) {
    this.movieService.addMovieToWatchlist(movieId).subscribe(() => {
      this.toastr.success('Add movie to watchlist successfully');
    });
  }
}
