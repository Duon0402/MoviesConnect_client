import { RatingListComponent } from './../ratings/rating-list/rating-list.component';
import {
  MovieOutputDto,
  RatingOutputDto,
} from './../../../shared/service-proxies/proxies.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../_services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  @ViewChild(RatingListComponent) ratingListComponent!: RatingListComponent;
  movie!: MovieOutputDto;
  showRatings: boolean = false;
  ratings!: RatingOutputDto[];

  constructor(
    private _service: ProxiesService,
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}
  ngOnInit(): void {
    this.loadMovie();
  }

  loadMovie() {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this._service.getMovieById(movieId).subscribe((response) => {
      this.movie = response;
    });
  }

  toggleRatings() {
    this.showRatings = !this.showRatings;
    if (this.showRatings) {
      this.loadRatings();
    }
  }

  loadRatings() {
    if (this.movie && this.movie.id) {
      this.movieService.getListRatings(this.movie.id).subscribe((ratings) => {
        this.ratings = ratings;
      });
    }
  }
}
