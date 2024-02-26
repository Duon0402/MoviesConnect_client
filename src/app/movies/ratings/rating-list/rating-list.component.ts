import { RatingOutputDto } from '../../../../shared/service-proxies/proxies.service';
import { MovieService } from './../../../_services/movie.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrl: './rating-list.component.css',
})
export class RatingListComponent implements OnInit {
  @Input() ratings: RatingOutputDto | any;

  constructor() {}

  ngOnInit(): void {}
}
