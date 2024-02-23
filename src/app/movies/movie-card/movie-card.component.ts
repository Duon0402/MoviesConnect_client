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
  isInWatchlist: boolean = false;
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
        this.checkWatchList();
      });
  }

  addToWatchlist(movieId: any) {
    this.movieService.addMovieToWatchlist(movieId).subscribe(() => {
      this.checkWatchList();
    });
  }

  removeFromWatchlist(movieId: any) {
    this.movieService.removeMovieFromWatchlist(movieId).subscribe(() => {
      this.checkWatchList();
    });
  }
  checkWatchList() {
    if (this.currentUser?.id) {
      this.movieService.getWatchList(this.currentUser?.id).subscribe((watchlist) => {
        this.watchlistMovies = watchlist;
        this.isInWatchlist = this.watchlistMovies.some(
          (watchlistMovie) => watchlistMovie.id === this.movie.id
        );
      });
    }
  }
}
