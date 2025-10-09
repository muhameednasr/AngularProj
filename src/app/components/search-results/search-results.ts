import { Component } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoviesService } from '../../shared/movies-service';
import { Imovie } from '../../models/imovie';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, NgForOf, NgIf, RouterLink],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults {
  query: string = '';
  movies$!: Observable<Imovie[]>;
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.movies$ = this.route.queryParamMap.pipe(
      switchMap((params) => {
        this.query = params.get('q') || '';
        return this.moviesService.searchMovies(this.query);
      })
    );
  }
}
