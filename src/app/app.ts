import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Movies } from './components/movies/movies';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Movies],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngularProj');
}
