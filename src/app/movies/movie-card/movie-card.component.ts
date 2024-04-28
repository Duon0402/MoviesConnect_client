import { Component, Input } from '@angular/core';
import {
  AccountOutputDto,
  ListMoviesOutputDto,
  ProxiesService,
} from '../../../shared/service-proxies/proxies.service';
import { ToastrService } from 'ngx-toastr';
import { MovieService } from '../../_services/movie.service';
import { take } from 'rxjs';
import { AccountService } from '../../_services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { RatingAddOrEditComponent } from '../ratings/rating-add-or-edit/rating-add-or-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() movie!: ListMoviesOutputDto;
  @Input() isShow: boolean = true;
  currentUser!: AccountOutputDto | null;
  watchlistMovies: ListMoviesOutputDto[] = [];

  constructor(
    private movieService: MovieService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
  }

  addMovieToWatchlist(movieId: any) {
    this.movieService.addMovieToWatchlist(movieId).subscribe(() => {
      this.movie.isInWatchList = true;
    });
  }

  removeMovieFromWatchlist(movieId: any) {
    this.openRatingDialog()
    this.movieService.removeMovieFromWatchlist(movieId).subscribe(() => {
      this.movie.isInWatchList = false;
    });
  }
  openRatingDialog(): void {
    if (this.currentUser != null) {
      const dialogRef = this.dialog.open(RatingAddOrEditComponent, {
        width: '500px',
        data: { movie: this.movie },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.addOrEditRating(result);
        }
      });
    } else {
      this.toastr.error('Please login to continue');
      this.router.navigateByUrl('/login');
    }
  }

  addOrEditRating(ratingData: any) {
    this.movieService
      .addOrEditRating(this.movie.id, ratingData)
      .subscribe(() => {
        this.toastr.success('Rating Successfuly');
      });
  }
}
