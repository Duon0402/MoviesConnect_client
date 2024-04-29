import { Component, Input, OnInit } from '@angular/core';
import {
  ActorOutputDto,
  ProxiesService,
} from '../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-actor-carousel',
  templateUrl: './actor-carousel.component.html',
  styleUrl: './actor-carousel.component.css',
})
export class ActorCarouselComponent implements OnInit{
  @Input() id!: string;
  @Input() movieId!: any;
  actors: ActorOutputDto[] = [];
  actorsChunks: ActorOutputDto[][] = [];
  actorsLoaded: boolean = false;

  constructor(private _service: ProxiesService) {}

  ngOnInit(): void {
    if(this.movieId != null) {
      this.loadActors(this.movieId);
    }
  }

  loadActors(movieId: any) {
    this._service.getListActorsByMovieId(movieId).subscribe(result => {
      this.actors = result
      this.chunkActors();
      this.actorsLoaded = true;
    })
  }

  chunkActors() {
    const chunkSize = 5;
    for (let i = 0; i < this.actors.length; i += chunkSize) {
      this.actorsChunks.push(this.actors.slice(i, i + chunkSize));
    }
  }
}
