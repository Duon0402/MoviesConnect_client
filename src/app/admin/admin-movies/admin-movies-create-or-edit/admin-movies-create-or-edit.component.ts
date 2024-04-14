import { MovieService } from './../../../_services/movie.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../_services/admin.service';
import { ToastrService } from 'ngx-toastr';
import {
  CertificationOutputDto,
  GenreOutputDto,
  MovieCreateDto,
  MovieOutputDto,
  MovieUpdateDto,
} from '../../../../shared/service-proxies/proxies.service';
import { DropdownItem } from '../../../_models/dropdownItem';

@Component({
  selector: 'app-admin-movies-create-or-edit',
  templateUrl: './admin-movies-create-or-edit.component.html',
  styleUrl: './admin-movies-create-or-edit.component.css',
})
export class AdminMoviesCreateOrEditComponent implements OnInit {
  movieData: MovieUpdateDto | MovieCreateDto = {};
  movieId?: number;
  movie: MovieOutputDto = {};
  certifis!: CertificationOutputDto[];
  genres!: DropdownItem[];
  selectedItems!: any;
  selectedFile!: File | null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminMoviesCreateOrEditComponent>,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    if (this.data.movieId != null) {
      this.loadMovie(this.data.movieId);
    }
    this.loadGenres();
    this.loadCertifis();
  }

  loadMovie(movieId: any) {
    this.movieService.getMovie(movieId).subscribe((result) => {
      this.movie = result;
      const genreIds = result.genres ? result.genres.map(genre => genre.id).filter(id => id !== undefined) : [];
      this.selectedItems = result.genres ? result.genres.map(genre => genre.name).filter(name => name !== undefined) : [];
      this.movieData = {
        title: result.title,
        summary: result.summary,
        durationMinutes: result.durationMinutes,
        releaseDate: result.releaseDate,
        status: result.status,
        genreIds: genreIds as any[],
        certificationId: result.certification ? result.certification.id : undefined
      };
    });
  }


  loadGenres() {
    this.movieService.getListGenres().subscribe((genres: GenreOutputDto[]) => {
      const dropdownItems: DropdownItem[] = genres.map((genre) => ({
        item_id: genre.id || 0,
        item_text: genre.name || '',
      }));
      this.genres = dropdownItems;
    });
  }

  loadCertifis() {
    this.movieService.getListCertifications().subscribe((result) => {
      this.certifis = result;
      if (this.movieData && this.movieData.certificationId) {
        const selectedCertification = this.certifis.find(certifi => certifi.id === this.movieData.certificationId);
        if (selectedCertification) {
          this.movieData.certificationId = selectedCertification.id;
        }
      }
    });
  }

  save() {
    const dataResult = {
      movieData: this.movieData,
      movieId: this.data.movieId,
      fileBanner: this.selectedFile
    };
    this.dialogRef.close(dataResult);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onGenresSelected(selectedItems: DropdownItem[]) {
    this.movieData.genreIds = selectedItems.map((item) => item.item_id);
  }

  onFileSelected(file: File) {
    this.selectedFile = file;
  }
}
