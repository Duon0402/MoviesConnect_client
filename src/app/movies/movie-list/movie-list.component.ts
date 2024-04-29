import {
  AccountOutputDto,
  ActorOutputDto,
  CertificationOutputDto,
  DirectorOutputDto,
  GenreOutputDto,
  ProxiesService,
} from './../../../shared/service-proxies/proxies.service';
import { MoviesParams } from './../../_models/movieParams';
import { MovieService } from './../../_services/movie.service';
import { Component, OnInit } from '@angular/core';
import { ListMoviesOutputDto } from '../../../shared/service-proxies/proxies.service';
import { DropdownItem } from '../../_models/dropdownItem';
import { ActorService } from '../../_services/actor.service';
import { DirectorService } from '../../_services/director.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  genres!: DropdownItem[];
  certifs!: DropdownItem[];
  actors!: DropdownItem[];
  directors!: DropdownItem[];
  selectedItems!: any[];

  movieParams: MoviesParams = {
    keyword: '',
    genreId: [],
    maxRating: 5,
    minRating: 0,
    status: ''
  };
  movies!: ListMoviesOutputDto[];

  constructor(private movieService: MovieService, private actorService: ActorService,
    private directorService: DirectorService, private _service: ProxiesService) {}

  ngOnInit(): void {
    this.initialData();
  }

  initialData() {
    this.loadMovies();
    this.loadGenres();
    this.loadCertifications();
    this.loadDirectors();
    this.loadActors();
  }

  loadMovies() {
    this.movieService
      .getListsMovies(this.movieParams)
      .subscribe((movies: ListMoviesOutputDto[]) => (this.movies = movies));
  }

  loadGenres() {
    this.movieService.getListGenres().subscribe((genres: GenreOutputDto[]) => {
      const dropdownItems: DropdownItem[] = genres.map((genre) => ({
        item_id: genre.id || 0,
        item_text: genre.name || '',
      }));

      this.genres = dropdownItems;
    });
  }

  loadActors() {
    this._service.getListActors().subscribe((actors: ActorOutputDto[]) => {
      const dropdownItems: DropdownItem[] = actors.map((actor) => ({
        item_id: actor.id || 0,
        item_text: actor.name || '',
      }));

      this.actors = dropdownItems;
    });
  }

  loadCertifications() {
    this.movieService
      .getListCertifications()
      .subscribe((certifs: CertificationOutputDto[]) => {
        const dropdownItems: DropdownItem[] = certifs.map((certif) => ({
          item_id: certif.id || 0,
          item_text: certif.name || '',
        }));

        this.actors = dropdownItems;
      });
  }

  loadDirectors() {
    this._service.getListDirectors().subscribe((directors: DirectorOutputDto[]) => {
      const dropdownItems: DropdownItem[] = directors.map((director) => ({
        item_id: director.id || 0,
        item_text: director.name || '',
      }));

      this.directors = dropdownItems;
    });
  }

  resetFilters() {
    this.movieParams = {
      keyword: '',
      genreId: [],
      maxRating: 5,
      minRating: 1,
      status: ''
    };
    this.loadMovies();
    this.selectedItems = [];
  }

  filterMovies() {
    this.loadMovies();
  }

  onGenresSelected(selectedItems: DropdownItem[]) {
    this.movieParams.genreId = selectedItems.map((item) => item.item_id);
  }

  onCertifisSelected(selectedItems: DropdownItem[]) {
    this.movieParams.certificationId = selectedItems.map(
      (item) => item.item_id
    );
  }

  onActorsSelected(selectedItems: DropdownItem[]) {
    this.movieParams.actorId = selectedItems.map((item) => item.item_id);
  }

  onDirectorsSelected(selectedItems: DropdownItem[]) {
    this.movieParams.directorId = selectedItems.map((item) => item.item_id);
  }
}
