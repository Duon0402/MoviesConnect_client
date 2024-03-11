import { Component, Input } from '@angular/core';
import { MovieService } from '../../../_services/movie.service';
import { ListMoviesOutputDto } from '../../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-member-watchlist',
  templateUrl: './member-watchlist.component.html',
  styleUrl: './member-watchlist.component.css'
})
export class MemberWatchlistComponent {
  @Input() movies!: ListMoviesOutputDto[];
  @Input() username?: string;
}
