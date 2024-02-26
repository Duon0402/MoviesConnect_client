import { Component, Input } from '@angular/core';
import {
  AccountOutputDto,
  ListMoviesOutputDto,
  ProxiesService,
} from '../../../shared/service-proxies/proxies.service';
import { ToastrService } from 'ngx-toastr';
import { MovieService } from '../../_services/movie.service';
import { take } from 'rxjs';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() movie!: ListMoviesOutputDto;
  currentUser!: AccountOutputDto | null;
  watchlistMovies: ListMoviesOutputDto[] = [];

  constructor(
    private movieService: MovieService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
      });
  }

  addToWatchlist(movieId: any) {
    this.movieService.addMovieToWatchlist(movieId).subscribe(() => {
      this.movie.isInWatchList = true;
    });
  }

  removeFromWatchlist(movieId: any) {
    this.movieService.removeMovieFromWatchlist(movieId).subscribe(() => {
      this.movie.isInWatchList = false;
    });
  }
}
