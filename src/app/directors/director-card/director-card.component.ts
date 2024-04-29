import { Component, Input } from '@angular/core';
import { DirectorOutputDto } from '../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrl: './director-card.component.css'
})
export class DirectorCardComponent {
  @Input() director!: DirectorOutputDto;
}
