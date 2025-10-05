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

  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];

  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.movies$ = this.movieService.getMovies();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.movieService.getMovies(page);
    }
  }

  getRatingColor(vote: number): string {
    const percent = vote * 10;
    if (percent >= 70) {
      return `conic-gradient(#21d07a ${percent * 3.6}deg, #204529 0deg)`;
    } else if (percent >= 50) {
      return `conic-gradient(#d2d531 ${percent * 3.6}deg, #423d0f 0deg)`;
    } else {
      return `conic-gradient(#db2360 ${percent * 3.6}deg, #571435 0deg)`;
    }
  }
}
