import { Component, Input } from '@angular/core';
import { ActorOutputDto } from '../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrl: './actor-card.component.css'
})
export class ActorCardComponent {
  @Input() actor!: ActorOutputDto;
}
