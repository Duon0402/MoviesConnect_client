import { RatingListComponent } from './../ratings/rating-list/rating-list.component';
import {
  MovieOutputDto,
  RatingOutputDto,
} from './../../../shared/service-proxies/proxies.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../_services/movie.service';
import { RatingAddOrEditComponent } from '../ratings/rating-add-or-edit/rating-add-or-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  @ViewChild(RatingListComponent) ratingListComponent!: RatingListComponent;
  movie!: MovieOutputDto;
  showRatings: boolean = false;
  ratingModalOpen: boolean = false;
  ratings!: RatingOutputDto[];

  constructor(
    private _service: ProxiesService,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private dialog: MatDialog
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
  // add or edit rating
  openRatingDialog(): void {
    const dialogRef = this.dialog.open(RatingAddOrEditComponent, {
      width: '500px',
      data: { movie: this.movie },
    });

    dialogRef.afterClosed().subscribe((result) => {

      // Note: neu rating ko thay doi thi ko can load lai (chua fix dc)

      this.loadMovie();
      if (this.showRatings == true) {
        this.loadRatings();
      }
    });
  }

  // list ratings
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
