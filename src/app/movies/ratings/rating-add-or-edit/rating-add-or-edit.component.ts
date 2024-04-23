import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import {
  MovieOutputDto,
  RatingAddOrEditDto,
  RatingOutputDto,
} from '../../../../shared/service-proxies/proxies.service';
import { MovieService } from '../../../_services/movie.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rating-add-or-edit',
  templateUrl: './rating-add-or-edit.component.html',
  styleUrl: './rating-add-or-edit.component.css',
})
export class RatingAddOrEditComponent implements OnInit {
  movie!: MovieOutputDto;
  ratingForm!: NgForm;
  ratingData: RatingAddOrEditDto = { score: 0, review: '' };

  constructor(
    private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RatingAddOrEditComponent>
  ) {}

  ngOnInit(): void {
    this.movie = this.data.movie;
    this.loadRating();
  }

  loadRating() {
    this.movieService.getRating(this.movie.id).subscribe((rating) => {
      this.ratingData = {
        score: rating.score,
        review: rating.review
      }
    });
  }

  addOrEditRating() {
    this.dialogRef.close(this.ratingData);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
