import { Component } from '@angular/core';
import { MoviesParams } from '../_models/movieParams';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  movieParams: MoviesParams = {
    pageSize: 3
  };

  constructor() {}


}
