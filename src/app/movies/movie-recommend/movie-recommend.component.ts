import { Component } from '@angular/core';
import { MovieService } from '../../_services/movie.service';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import { AccountOutputDto, ListMoviesOutputDto, ProxiesService } from '../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-movie-recommend',
  templateUrl: './movie-recommend.component.html',
  styleUrl: './movie-recommend.component.css'
})
export class MovieRecommendComponent {
  currentUser!: AccountOutputDto | null;
  movies!: ListMoviesOutputDto[];

  constructor(
    private _service: ProxiesService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((currentUser) => (this.currentUser = currentUser));
  }

  ngOnInit(): void {
    this.loadListRecommendMovies();
  }

  loadListRecommendMovies() {
    this._service.getListRecommendMovies().subscribe(result => {
      this.movies = result;
    })
  }
}
