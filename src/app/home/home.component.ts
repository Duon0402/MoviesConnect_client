import { AccountService } from './../_services/account.service';
import { MovieService } from './../_services/movie.service';
import { Component, OnInit } from '@angular/core';
import { MoviesParams } from '../_models/movieParams';
import { AccountOutputDto, MovieOutputDto, ProxiesService } from '../../shared/service-proxies/proxies.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  topMovies: MoviesParams = {
    orderBy: 'score',
    sortOrder: 'desc',
    status: 'Released',
    pageSize: 10,
  };

  moviesComimgSoon: MoviesParams = {
    orderBy: 'release-date',
    sortOrder: 'desc',
    status: 'Unreleased',
    pageSize: 10,
  };


  currentUser?: AccountOutputDto | null;

  genres: any[] = [];
  recommendMovies!: any[];
  certifs: any[] = [];
  constructor(
    private movieService: MovieService,
    private accountService: AccountService,
    private _service: ProxiesService
  ) {
    this.accountService.currentUser$
    .pipe(take(1))
    .subscribe((currentUser) => (this.currentUser = currentUser));
  }

  ngOnInit(): void {
    // if(this.currentUser) {
    //   this.loadListRecommendMovies();
    // }
    this.loadGenres();
    this.loadCertification();
  }

  loadGenres() {
    this.movieService.getListGenres().subscribe((result) => {
      this.genres = result;
    })
  }

  loadCertification() {
    this.movieService.getListCertifications().subscribe(result => {
      this.certifs = result;
    })
  }
}
