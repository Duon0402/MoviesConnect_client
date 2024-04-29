import { Component, Input } from '@angular/core';
import { DirectorOutputDto, ProxiesService } from '../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-director-carousel',
  templateUrl: './director-carousel.component.html',
  styleUrl: './director-carousel.component.css'
})
export class DirectorCarouselComponent {
  @Input() id!: string;
  directors: DirectorOutputDto[] = [];
  directorsChunks: DirectorOutputDto[][] = [];

  constructor(private _service: ProxiesService) {}

  ngOnInit(): void {
    this.loadDirector();
  }

  loadDirector() {
    this._service.getListDirectors().subscribe(result => {
      this.directors = result
      this.chunkActors();
    })
  }

  chunkActors() {
    const chunkSize = 5;
    for (let i = 0; i < this.directors.length; i += chunkSize) {
      this.directorsChunks.push(this.directors.slice(i, i + chunkSize));
    }
  }
}
