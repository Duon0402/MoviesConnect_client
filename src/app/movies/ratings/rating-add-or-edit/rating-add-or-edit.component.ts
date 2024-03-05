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
  ratingData: RatingAddOrEditDto = { score: 0, comment: '' };

  constructor(
    private movieService: MovieService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RatingAddOrEditComponent>
  ) {}

  ngOnInit(): void {
    this.movie = this.data.movie;
    this.loadRating();
  }

  loadRating() {
    this.movieService.getRating(this.movie.id).subscribe((rating) => {
      (this.ratingData.comment = rating.comment),
        (this.ratingData.score = rating.score);
    });
  }

  addOrEditRating() {
    this.movieService
      .addOrEditRating(this.movie.id, this.ratingData)
      .subscribe(() => {
        this.toastr.success('Rating Successfully');
        this.dialogRef.close(true);
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
