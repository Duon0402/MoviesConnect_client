import { Component, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { MovieService } from '../_services/movie.service';
import { MoviesParams } from '../_models/movieParams';
import { ListMoviesOutputDto, MovieOutputDto } from '../../shared/service-proxies/proxies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  @Output() moviesParams: MoviesParams = {
    keyword: '',
  };

  constructor(
    public accountService: AccountService,
    private movieService: MovieService,
    private router: Router
  ) {}

  logout() {
    this.accountService.logout();
  }
}
