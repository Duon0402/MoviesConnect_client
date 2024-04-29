import { DropdownItem } from './../../../_models/dropdownItem';
import { MovieService } from './../../../_services/movie.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ActorOutputDto,
  CertificationOutputDto,
  DirectorOutputDto,
  GenreOutputDto,
  MovieCreateDto,
  MovieOutputDto,
  MovieUpdateDto,
  ProxiesService,
} from '../../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-admin-movies-create-or-edit',
  templateUrl: './admin-movies-create-or-edit.component.html',
  styleUrl: './admin-movies-create-or-edit.component.css',
})
export class AdminMoviesCreateOrEditComponent implements OnInit {
  movieData: MovieUpdateDto | MovieCreateDto = {};
  movieId?: number;
  movie: MovieOutputDto = {};
  certifis!: DropdownItem[];
  genres!: DropdownItem[];
  selectedGenres!: any;
  selectedActors!: any;
  selectedDirector!: any;
  selectedCertifi!: any;
  selectedFile!: File | null;
  actors!: DropdownItem[];
  directors!: DropdownItem[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminMoviesCreateOrEditComponent>,
    private movieService: MovieService,
    private _service: ProxiesService
  ) {}

  ngOnInit(): void {
    if (this.data.movieId != null) {
      this.loadMovie(this.data.movieId);
    }
    this.initialData();
  }

  initialData() {
    this.loadGenres();
    this.loadCertifis();
    this.loadDirectors();
    this.loadActors();
  }

  loadMovie(movieId: any) {
    this.movieService.getMovie(movieId).subscribe((result) => {
      this.movie = result;
      // Thiết lập giá trị ban đầu cho selectedGenres và selectedActors
      const genreIds = result.genres ? result.genres.map(genre => genre.id).filter(id => id !== undefined) : [];
      this.selectedGenres = result.genres ? result.genres.map(genre => ({ item_id: genre.id, item_text: genre.name })).filter(genre => genre.item_id !== undefined) : [];

      const actorIds = result.actors ? result.actors.map(actor => actor.id).filter(id => id !== undefined) : [];
      this.selectedActors = result.actors ? result.actors.map(actor => ({ item_id: actor.id, item_text: actor.name })).filter(actor => actor.item_id !== undefined) : [];

      // Thiết lập giá trị ban đầu cho selectedDirector và selectedCertifi
      this.selectedDirector = result.director ? [{ item_id: result.director.id, item_text: result.director.name }] : [];
      this.selectedCertifi = result.certification ? [{ item_id: result.certification.id, item_text: result.certification.name }] : [];

      this.movieData = {
        title: result.title,
        summary: result.summary,
        durationMinutes: result.durationMinutes,
        releaseDate: result.releaseDate,
        status: result.status,
        genreIds: genreIds as any[],
        actorIds: actorIds as any[],
        certificationId: result.certification ? result.certification.id : undefined,
        directorId: result.director ? result.director.id : undefined,
      };
      console.log(this.movieData);
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
    this.movieService.getListCertifications().subscribe((certifis: CertificationOutputDto[]) => {
      const dropdownItems: DropdownItem[] = certifis.map((certifi) => ({
        item_id: certifi.id || 0,
        item_text: certifi.name || '',
      }));
      this.certifis = dropdownItems;
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

  loadActors() {
    this._service.getListActors().subscribe((actors: ActorOutputDto[])=> {
      const dropdownItems: DropdownItem[] = actors.map((actor) => ({
        item_id: actor.id || 0,
        item_text: actor.name || '',
      }));
      this.actors = dropdownItems;
    })
  }

  loadDirectors() {
    this._service.getListDirectors().subscribe((directors: DirectorOutputDto[])=> {
      const dropdownItems: DropdownItem[] = directors.map((director) => ({
        item_id: director.id || 0,
        item_text: director.name || '',
      }));
      this.directors = dropdownItems;
    })
  }

  onActorsSelected(selectedItems: DropdownItem[]) {
    this.movieData.actorIds = selectedItems.map((item) => item.item_id);
  }

  onDirectorSelected(selectedItems: DropdownItem[]) {
    this.movieData.directorId = (selectedItems && selectedItems.length > 0) ? selectedItems[0].item_id : 0;
}

  onCertifiSelected(selectedItems: DropdownItem[]) {
    this.movieData.certificationId = (selectedItems && selectedItems.length > 0) ? selectedItems[0].item_id : 0;
  }
}
