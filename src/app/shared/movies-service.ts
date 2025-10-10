import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LanguageService } from './language-service';
import { Imovie } from '../models/imovie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiKey = 'cdf737fb0a8771a79228a4d738740585';
  private baseURL = `https://api.themoviedb.org/3`;

  constructor(private http: HttpClient, private lang: LanguageService) {}

  // languageCode is optional short code like 'en'|'ar'|'fr'|'zh'
  getMovies(
    page: number = 1,
    languageCode?: string
  ): Observable<{ results: Imovie[]; total_pages: number }> {
    const tmdbLang = languageCode
      ? this.lang.getTmdbLanguage(languageCode as any)
      : this.lang.getTmdbLanguage();
    return this.http
      .get<{ results: Imovie[]; total_pages: number }>(
        `${this.baseURL}/movie/now_playing?api_key=${this.apiKey}&language=${tmdbLang}&page=${page}`
      )
      .pipe(map((res) => res));
  }

  searchMovies(
    query: string,
    page: number = 1
  ): Observable<{ results: Imovie[]; total_pages: number }> {
    const encoded = encodeURIComponent(query);
    return this.http
      .get<{ results: Imovie[]; total_pages: number }>(
        `${this.baseURL}/search/movie?api_key=${
          this.apiKey
        }&language=${this.lang.getTmdbLanguage()}&query=${encoded}&page=${page}`
      )
      .pipe(map((res) => res));
  }

  getMovie(id: number): Observable<Imovie> {
    return this.http
      .get<Imovie>(
        `${this.baseURL}/movie/${id}?api_key=${this.apiKey}&language=${this.lang.getTmdbLanguage()}`
      )
      .pipe(map((res) => res));
  }

  getRecommendations(id: number): Observable<Imovie[]> {
    return this.http
      .get<{ results: Imovie[] }>(
        `${this.baseURL}/movie/${id}/recommendations?api_key=${
          this.apiKey
        }&language=${this.lang.getTmdbLanguage()}`
      )
      .pipe(map((res) => res.results));
  }
}
