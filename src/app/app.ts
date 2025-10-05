import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Movies } from './components/movies/movies';
import { ParameterizedMovie } from './components/parameterized-movie/parameterized-movie';
import { Footer } from './components/footer/footer';
import { Watchlist } from './components/watchlist/watchlist';

import { DetailsPage } from "./components/details-page/details-page";
import { Header } from "./components/header/header";
import { I } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { WishlistService } from './auth/wishlist-service';
import { MovieService } from './auth/movie-service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Movies, ParameterizedMovie, Footer, Watchlist],
  templateUrl: './app.html',
  styleUrl: './app.css',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('AngularProj');
}
