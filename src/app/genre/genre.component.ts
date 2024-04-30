import { Component, Input, OnInit } from '@angular/core';
import { MoviesParams } from '../_models/movieParams';
import { ActivatedRoute } from '@angular/router';
import { ProxiesService } from '../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css',
})
export class GenreComponent implements OnInit {
  genre!: any;
  genreId!: any;
  moviesParams: MoviesParams = {};
  constructor(
    private route: ActivatedRoute,
    private _service: ProxiesService
  ) {}

  ngOnInit(): void {
    this.genreId = Number(this.route.snapshot.paramMap.get('id'));
    this.moviesParams = {
      genreId: [this.genreId],
      orderBy: 'score',
      sortOrder: 'desc',
      pageSize: 10,
    };
    this.loadGenre(this.genreId);
  }

  loadGenre(genreId: any) {
    this._service.getGenre(genreId).subscribe((result) => {
      this.genre = result;
    });
  }
}
