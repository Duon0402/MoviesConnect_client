import { take } from 'rxjs';
import {
  AccountOutputDto,
  ListMoviesOutputDto,
} from '../../../shared/service-proxies/proxies.service';
import { AccountService } from '../../_services/account.service';
import { MovieService } from './../../_services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css',
})
export class WatchlistComponent implements OnInit {
  currentUser!: AccountOutputDto | null;
  movies!: ListMoviesOutputDto[];

  constructor(
    private movieService: MovieService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((currentUser) => (this.currentUser = currentUser));
  }

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist() {
    this.movieService
      .getWatchList(this.currentUser?.id)
      .subscribe((movies: ListMoviesOutputDto[]) => {
        this.movies = movies;
      });
  }
}
