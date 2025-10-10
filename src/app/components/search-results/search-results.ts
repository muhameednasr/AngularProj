import { Component } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoviesService } from '../../shared/movies-service';
import { LanguageService } from '../../shared/language-service';
import { combineLatest } from 'rxjs';
import { Imovie } from '../../models/imovie';
import { Observable, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, NgForOf, NgIf, RouterLink],
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.css'],
})
export class SearchResults {
  query: string = '';
  movies$!: Observable<Imovie[]>;
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.movies$ = combineLatest([
      this.route.queryParamMap,
      this.languageService.currentLanguage$,
    ]).pipe(
      switchMap(([params]) => {
        this.query = params.get('q') || '';
        // if query is empty, return the default movies list
        if (!this.query || this.query.trim() === '') {
          return this.moviesService.getMovies(1).pipe(map((res) => res.results));
        }
        return this.moviesService.searchMovies(this.query).pipe(map((res) => res.results || []));
      })
    );
  }
}
