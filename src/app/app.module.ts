import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './_modules/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { RegisterComponent } from './accounts/register/register.component';
import { HomeComponent } from './home/home.component';
import { MovieCreateComponent } from './movies/movie-create/movie-create.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { LoginComponent } from './accounts/login/login.component';
import { ChangePasswordComponent } from './accounts/change-password/change-password.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MovieCardComponent } from './movies/movie-card/movie-card.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { UploadImageComponent } from './_forms/upload-image/upload-image.component';
import { MenuComponent } from './menu/menu.component';
import { RatingAddOrEditComponent } from './movies/ratings/rating-add-or-edit/rating-add-or-edit.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { WatchlistComponent } from './movies/watchlist/watchlist.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { RatingListComponent } from './movies/ratings/rating-list/rating-list.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminUserRolesComponent } from './admin/admin-users/admin-user-roles/admin-user-roles.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MovieCarouselComponent } from './movies/movie-carousel/movie-carousel.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberWatchlistComponent } from './members/member-detail/member-watchlist/member-watchlist.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { AdminMoviesComponent } from './admin/admin-movies/admin-movies.component';
import { TableDataComponent } from './_forms/table-data/table-data.component';
import { MultiselectDropdownComponent } from './_forms/multiselect-dropdown/multiselect-dropdown.component';
import { AdminUserRolesEditComponent } from './admin/admin-users/admin-user-roles/admin-user-roles-edit/admin-user-roles-edit.component';
import { AdminMoviesCreateOrEditComponent } from './admin/admin-movies/admin-movies-create-or-edit/admin-movies-create-or-edit.component';
import { DateFormatPipe } from './_pipes/date-format.pipe';
import { AdminGenresComponent } from './admin/admin-genres/admin-genres.component';
import { DeleteDialogComponent } from './_forms/delete-dialog/delete-dialog.component';
import { AdminGenresCreateOrEditComponent } from './admin/admin-genres/admin-genres-create-or-edit/admin-genres-create-or-edit.component';
import { AdminCertificationsComponent } from './admin/admin-certifications/admin-certifications.component';
import { ReportFormComponent } from './_forms/report-form/report-form.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';
import { AdminReportDetailComponent } from './admin/admin-reports/admin-report-detail/admin-report-detail.component';
import { FillterRatingComponent } from './movies/ratings/fillter-rating/fillter-rating.component';
import { AdminReportHandleComponent } from './admin/admin-reports/admin-report-handle/admin-report-handle.component';
import { ConfirmDialogComponent } from './_forms/confirm-dialog/confirm-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { MovieRecommendComponent } from './movies/movie-recommend/movie-recommend.component';
import { AdminCertificationsCreateOrEditComponent } from './admin/admin-certifications/admin-certifications-create-or-edit/admin-certifications-create-or-edit.component';
import { AdminActorsComponent } from './admin/admin-actors/admin-actors.component';
import { AdminActorCreateOrEditComponent } from './admin/admin-actors/admin-actor-create-or-edit/admin-actor-create-or-edit.component';
import { AdminDirectorsComponent } from './admin/admin-directors/admin-directors.component';
import { AdminDirectorCreateOrEditComponent } from './admin/admin-directors/admin-director-create-or-edit/admin-director-create-or-edit.component';
import { MemberPointComponent } from './members/member-edit/member-point/member-point.component';
import { MemberVoucherComponent } from './members/member-edit/member-voucher/member-voucher.component';
import { MemberRedeemPointsComponent } from './members/member-edit/member-redeem-points/member-redeem-points.component';
import { ActorDetailComponent } from './actors/actor-detail/actor-detail.component';
import { ActorCardComponent } from './actors/actor-card/actor-card.component';
import { ActorCarouselComponent } from './actors/actor-carousel/actor-carousel.component';
import { DirectorCardComponent } from './directors/director-card/director-card.component';
import { DirectorCarouselComponent } from './directors/director-carousel/director-carousel.component';
import { DirectorDetailComponent } from './directors/director-detail/director-detail.component';
import { DirectorListComponent } from './directors/director-list/director-list.component';
import { ActorListComponent } from './actors/actor-list/actor-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MovieListComponent,
    TextInputComponent,
    RegisterComponent,
    HomeComponent,
    MovieCreateComponent,
    MovieDetailComponent,
    DateInputComponent,
    LoginComponent,
    ChangePasswordComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MovieCardComponent,
    UploadImageComponent,
    MenuComponent,
    RatingAddOrEditComponent,
    AdminHomeComponent,
    WatchlistComponent,
    AdminSidebarComponent,
    RatingListComponent,
    AdminUsersComponent,
    AdminUserRolesComponent,
    MovieCarouselComponent,
    MemberDetailComponent,
    MemberWatchlistComponent,
    MemberEditComponent,
    AdminMoviesComponent,
    TableDataComponent,
    MultiselectDropdownComponent,
    AdminUserRolesEditComponent,
    AdminMoviesCreateOrEditComponent,
    DateFormatPipe,
    AdminGenresComponent,
    DeleteDialogComponent,
    AdminCertificationsComponent,
    ReportFormComponent,
    AdminReportsComponent,
    AdminReportDetailComponent,
    FillterRatingComponent,
    AdminReportHandleComponent,
    ConfirmDialogComponent,
    FooterComponent,
    AdminDashboardComponent,
    MovieRecommendComponent,
    AdminGenresCreateOrEditComponent,
    AdminCertificationsCreateOrEditComponent,
    AdminActorsComponent,
    AdminActorCreateOrEditComponent,
    AdminDirectorsComponent,
    AdminDirectorCreateOrEditComponent,
    MemberPointComponent,
    MemberVoucherComponent,
    MemberRedeemPointsComponent,
    ActorDetailComponent,
    ActorCardComponent,
    ActorCarouselComponent,
    DirectorCardComponent,
    DirectorCarouselComponent,
    DirectorDetailComponent,
    DirectorListComponent,
    ActorListComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
