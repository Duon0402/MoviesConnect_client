import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorOutputDto, ListMoviesOutputDto, ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { MoviesParams } from '../../_models/movieParams';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrl: './actor-detail.component.css',
})
export class ActorDetailComponent implements OnInit {
  actor!: ActorOutputDto;
  topMovies!: MoviesParams;

  constructor(private route: ActivatedRoute, private _service: ProxiesService) {}

  ngOnInit(): void {
    const actorId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadActor(actorId);
    this.topMovies = {
      actorId: [actorId],
      orderBy: 'score',
      sortOrder: 'desc',
      pageSize: 10,
    }
  }

  loadActor(actorId: any) {
    this._service.getActor(actorId).subscribe(result => {
      this.actor = result;
    })
  }
}
