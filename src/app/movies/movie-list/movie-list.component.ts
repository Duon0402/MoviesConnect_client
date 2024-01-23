import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import {
  Movie,
  ProxiesService,
} from '../../../shared/service-proxies/proxies.service';
import { finalize, map } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit{
  pageNumber: number = 1;
  pageSize: number = 5;
  totalItems!: number;
  movies: Movie[] = [];

  constructor(private _service: ProxiesService) {}

  ngOnInit(): void {
    this.getListMovies();
  }

  getListMovies() {
    this._service.getPagedListMovies(this.pageNumber, this.pageSize).subscribe(
      (resp: any) => {
        this.totalItems = resp.totalItems;
        this.movies = resp.pagedItems;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  pageChanged(event: any) {
    this.pageNumber = event;
    this.getListMovies();
  }
}
