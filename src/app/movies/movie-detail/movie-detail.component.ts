import { MovieOutputDto } from './../../../shared/service-proxies/proxies.service';
import { Component, Input, OnInit } from '@angular/core';
import { ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  movie!: MovieOutputDto;

  constructor(private _service: ProxiesService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.loadMovie();
  }

  loadMovie() {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this._service.getMovieById(movieId).subscribe(
      (response) => {
        this.movie = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
