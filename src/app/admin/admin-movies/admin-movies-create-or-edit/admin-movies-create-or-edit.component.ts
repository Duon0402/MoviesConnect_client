import { DropdownItem } from './../../../_models/dropdownItem';
import { MovieService } from './../../../_services/movie.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ActorInputDto,
  ActorOutputDto,
  CertificationOutputDto,
  DirectorInputDto,
  DirectorOutputDto,
  GenreOutputDto,
  MovieCreateDto,
  MovieOutputDto,
  MovieUpdateDto,
  ProxiesService,
} from '../../../../shared/service-proxies/proxies.service';
import { AdminService } from '../../../_services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { AdminGenresCreateOrEditComponent } from '../../admin-genres/admin-genres-create-or-edit/admin-genres-create-or-edit.component';
import { auto } from '@popperjs/core';
import { ActorService } from '../../../_services/actor.service';
import { AdminActorCreateOrEditComponent } from '../../admin-actors/admin-actor-create-or-edit/admin-actor-create-or-edit.component';
import { AdminCertificationsCreateOrEditComponent } from '../../admin-certifications/admin-certifications-create-or-edit/admin-certifications-create-or-edit.component';
import { DirectorService } from '../../../_services/director.service';
import { AdminDirectorCreateOrEditComponent } from '../../admin-directors/admin-director-create-or-edit/admin-director-create-or-edit.component';

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
    private _service: ProxiesService,
    private adminService: AdminService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private actorService: ActorService,
    private directorService: DirectorService
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

  openCreateGenre(genreId?: any) {
    const dialogRef = this.dialog.open(AdminGenresCreateOrEditComponent, {
      width: '400px',
      height: auto,
      data: { genreId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createGenre( result.genreData);
      }
    });
  }

  createGenre(genreData: any) {
    this.adminService.createGenre(genreData).subscribe(() => {
      this.toastr.success('Create genre successful');
      this.loadGenres();
    })
  }

  createOrEditActor(actorData: ActorInputDto, actorId?: number, file?: File) {
    this.actorService.createOrEditActor(actorData, actorId).subscribe((result) => {
      if(file != null && result != null) {
        this.actorService.changeActorImage(file, result).subscribe(() => {
          this.loadActors();
        })
      }
      const message = actorData ? 'Edit' : 'Create';
      this.toastr.success(`${message} actor successful`);
      this.loadActors();
    })
  }

  openCreateOrEditActorDialog(actorId?: any) {
    const dialogRef = this.dialog.open(AdminActorCreateOrEditComponent, {
      width: '800px',
      height: auto,
      data: { actorId: actorId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if(result.file) {
          this.createOrEditActor(result.actorData, result.actorId, result.file);
        }
        else {
          this.createOrEditActor(result.actorData, result.actorId);
        }
      }
    });
  }

  openCreateOrEditCertiDialog(certiId?: any): void {
    const dialogRef = this.dialog.open(AdminCertificationsCreateOrEditComponent, {
      width: '400px',
      height: auto,
      data: { certiId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createOrEditCerti(result.certiId, result.certiData);
      }
    });
  }

  createOrEditCerti(certiId: number, certiData: any) {
    this.adminService.createOrEditCerti(certiData, certiId).subscribe(() => {
      const message = certiId ? 'Edit' : 'Create';
      this.toastr.success(`${message} certification successful`);
      this.loadCertifis();
    })
  }

  createOrEditDirector(directorData: DirectorInputDto, directorId?: number, file?: File) {
    this.directorService.createOrEditDirector(directorData, directorId).subscribe((result) => {
      if(file != null && result != null) {
        this.directorService.changeDirectorImage(file, result).subscribe(() => {
          this.loadDirectors();
        })
      }
      const message = directorData ? 'Edit' : 'Create';
      this.toastr.success(`${message} director successful`);
      this.loadDirectors();
    })
  }

  openCreateOrEditDialog(directorId?: any) {
    const dialogRef = this.dialog.open(AdminDirectorCreateOrEditComponent, {
      width: '800px',
      height: auto,
      data: { directorId: directorId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if(result.file) {
          this.createOrEditDirector(result.directorData, result.directorId, result.file);
        }
        else {
          this.createOrEditDirector(result.directorData, result.directorId);
        }
      }
    });
  }
}





