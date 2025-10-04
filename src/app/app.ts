import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Movies } from './components/movies/movies';
import { ParameterizedMovie } from './components/parameterized-movie/parameterized-movie';
import { Footer } from './components/footer/footer';
import { Watchlist } from './components/watchlist/watchlist';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Movies, ParameterizedMovie, Footer, Watchlist],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('AngularProj');
}
