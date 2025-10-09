import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
<<<<<<< HEAD

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
=======
import { Movies } from './components/movies/movies';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Movies, Footer],
>>>>>>> c0d7798a8b57f58e1a48b9d158db44d78d7c444e
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  public readonly title = signal('AngularProj');
}
