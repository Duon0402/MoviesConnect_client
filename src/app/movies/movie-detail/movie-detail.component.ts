import { RatingParams } from './../../_models/ratingParams';
import { MemberService } from './../../_services/member.service';
import { RatingListComponent } from './../ratings/rating-list/rating-list.component';
import {
  MovieOutputDto,
  RatingOutputDto,
} from './../../../shared/service-proxies/proxies.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../_services/movie.service';
import { RatingAddOrEditComponent } from '../ratings/rating-add-or-edit/rating-add-or-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { ReportFormComponent } from '../../_forms/report-form/report-form.component';
import { FillterRatingComponent } from '../ratings/fillter-rating/fillter-rating.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  showCertificationInfo: boolean = false;
  @ViewChild(RatingListComponent) ratingListComponent!: RatingListComponent;
  movie!: MovieOutputDto;
  showRatings: boolean = false;
  ratingModalOpen: boolean = false;
  ratings!: RatingOutputDto[];
  ratingParams?: RatingParams;

  constructor(
    private _service: ProxiesService,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private memberService: MemberService
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
      if (result) {
        this.addOrEditRating(result);
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

  addOrEditRating(ratingData: any) {
    this.movieService
      .addOrEditRating(this.movie.id, ratingData)
      .pipe(
        finalize(() => {
          this.toastr.success('Rating Successfuly');
        })
      )
      .subscribe(() => {
        this.loadMovie();
        if (this.showRatings == true) {
          this.loadRatings();
        }
      });
  }

  loadRatings() {
    if (this.movie && this.movie.id) {
      this.movieService.getListRatings(this.movie.id).subscribe((ratings) => {
        this.ratings = ratings;
      });
    }
  }

  //reportMovie
  openReportFormMovie() {
    const dialogRef = this.dialog.open(ReportFormComponent, {
      width: '800px',
      height: 'auto',
      data: { objectId: this.movie.id, objectType: 'Movie' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createReportMovie(result);
      }
    });
  }

  createReportMovie(data: any) {
    this.memberService.createReport(data).subscribe(() => {
      this.toastr.success('Send report sucessful');
    });
  }

  openFilterRating() {
    const dialogRef = this.dialog.open(FillterRatingComponent, {
      width: '500px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.movieService
          .getListRatings(this.movie.id, result.score, result.ratingViolation)
          .subscribe((ratings) => {
            this.ratings = ratings;
          });
      }
    });
  }
}
