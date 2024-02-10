import { Component, Input } from '@angular/core';
import { ListMoviesOutputDto } from '../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() movie!: ListMoviesOutputDto;
}
