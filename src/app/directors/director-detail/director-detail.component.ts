import { Component } from '@angular/core';
import { DirectorOutputDto, ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { MoviesParams } from '../../_models/movieParams';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrl: './director-detail.component.css'
})
export class DirectorDetailComponent {
  director!: DirectorOutputDto;
  topMovies!: MoviesParams;

  constructor(private route: ActivatedRoute, private _service: ProxiesService) {}

  ngOnInit(): void {
    const directorId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDirector(directorId);
    this.topMovies = {
      directorId: [directorId],
      orderBy: 'score',
      sortOrder: 'desc',
      pageSize: 10,
    }
  }

  loadDirector(directorId: any) {
    this._service.getDirector(directorId).subscribe(result => {
      this.director = result;
    })
  }
}
