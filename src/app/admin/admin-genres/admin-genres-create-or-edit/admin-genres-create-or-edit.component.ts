import { Component, Inject, OnInit } from '@angular/core';
import { GenreCreateDto, GenreOutputDto, GenreUpdateDto, ProxiesService } from '../../../../shared/service-proxies/proxies.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-genres-create-or-edit',
  templateUrl: './admin-genres-create-or-edit.component.html',
  styleUrl: './admin-genres-create-or-edit.component.css'
})
export class AdminGenresCreateOrEditComponent implements OnInit{
  genre!: GenreOutputDto;
  genreData: GenreCreateDto | GenreUpdateDto = {
    name: ''
  }

  constructor(
    private _service: ProxiesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminGenresCreateOrEditComponent>,
  ) {}

  ngOnInit(): void {
    if (this.data.genreId != null) {
      this.loadGenre(this.data.genreId);
    }
  }

  loadGenre(genreId: number) {
    this._service.getGenre(genreId).subscribe(result => {
      this.genre = result;
      this.genreData = {
        name: this.genre.name
      }
    })
  }

  save() {
    const dataResult = {
      genreData: this.genreData,
      genreId: this.data.genreId,
    };
    this.dialogRef.close(dataResult);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
