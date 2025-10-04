import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from '../../shared/movies-service';
import { Imovie } from '../../models/imovie';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  imports: [FormsModule, CommonModule],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {
  movies$!: Observable<Imovie[]>;

  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  constructor(private movieService: MoviesService) {
    this.movies$ = this.movieService.getMovies();
  }
}
