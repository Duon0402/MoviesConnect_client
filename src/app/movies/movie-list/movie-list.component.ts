import {
  CertificationOutputDto,
  GenreOutputDto,
} from './../../../shared/service-proxies/proxies.service';
import { MoviesParams } from './../../_models/movieParams';
import { MovieService } from './../../_services/movie.service';
import { Component, OnInit } from '@angular/core';
import { ListMoviesOutputDto } from '../../../shared/service-proxies/proxies.service';
import { DropdownItem } from '../../_models/dropdownItem';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  genres!: DropdownItem[];
  certifs!: DropdownItem[];
  selectedItems!: any[];

  movieParams: MoviesParams = {
    keyword: '',
    genreId: [],
  };
  movies!: ListMoviesOutputDto[];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.initialData();
  }

  initialData() {
    this.loadMovies();
    this.loadGenres();
    this.loadCertifications();
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

  loadCertifications() {
    this.movieService
      .getListCertifications()
      .subscribe((certifs: CertificationOutputDto[]) => {
        const dropdownItems: DropdownItem[] = certifs.map((certif) => ({
          item_id: certif.id || 0,
          item_text: certif.name || '',
        }));

        this.certifs = dropdownItems;
      });
  }

  resetFilters() {
    this.movieParams = {
      keyword: '',
      genreId: [],
      certificationId: []
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
}
