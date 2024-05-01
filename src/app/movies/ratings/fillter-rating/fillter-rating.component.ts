import { Component, Inject } from '@angular/core';
import { RatingParams } from '../../../_models/ratingParams';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fillter-rating',
  templateUrl: './fillter-rating.component.html',
  styleUrl: './fillter-rating.component.css',
})
export class FillterRatingComponent {
  ratingParams: RatingParams = {
    ratingViolation: false
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FillterRatingComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  filterRating() {
    this.dialogRef.close(this.ratingParams);
  }
}
