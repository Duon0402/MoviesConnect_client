import { MovieService } from './../../../_services/movie.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../_services/admin.service';
import { ToastrService } from 'ngx-toastr';
import {
  MovieCreateDto,
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminMoviesCreateOrEditComponent>,
    private adminService: AdminService,
    private toastr: ToastrService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {}

  loadMovie() {
    this.movieService.getMovie(this.movieId).subscribe(() => {

    })
  }

  createOrEditMovie() {
    this.adminService
      .createOrEditMovie(this.movieData, this.movieId)
      .subscribe(() => this.toastr.success('Successfully'));
  }
}
