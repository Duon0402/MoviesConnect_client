import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './_modules/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MovieCreateComponent } from './movies/movie-create/movie-create.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
