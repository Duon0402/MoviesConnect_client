import { MovieService } from './../../../_services/movie.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../_services/admin.service';
import { ToastrService } from 'ngx-toastr';
import {
  MovieCreateDto,
  MovieOutputDto,
  MovieUpdateDto,
} from '../../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-admin-movies-create-or-edit',
  templateUrl: './admin-movies-create-or-edit.component.html',
  styleUrl: './admin-movies-create-or-edit.component.css',
})
export class AdminMoviesCreateOrEditComponent implements OnInit {
  movieData!: MovieUpdateDto | MovieCreateDto;
  movieId?: number;
  movie: MovieOutputDto = {}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminMoviesCreateOrEditComponent>,
    private adminService: AdminService,
    private toastr: ToastrService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    if(this.data.movieId != null) {
      this.loadMovie(this.data.movieId);
    }
  }

  loadMovie(movieId: any) {
    this.movieService.getMovie(movieId).subscribe((result) => {
      this.movie = result;
    })
  }
  createOrEditMovie() {
    this.adminService
      .createOrEditMovie(this.movieData, this.movieId)
      .subscribe(() => this.toastr.success('Successfully'));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
