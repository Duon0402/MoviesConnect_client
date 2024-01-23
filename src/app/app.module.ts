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
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MovieCreateComponent } from './movies/movie-create/movie-create.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { UserWatchListComponent } from './users/user-watch-list/user-watch-list.component';

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
    UserProfileComponent,
    UserWatchListComponent
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
