import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { map, Observable } from 'rxjs';
import { LanguageService } from './language-service';
=======
import { Observable, map } from 'rxjs';
import { Imovie } from '../models/imovie';
>>>>>>> c0d7798a8b57f58e1a48b9d158db44d78d7c444e

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey = 'cdf737fb0a8771a79228a4d738740585';
  private baseURL = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient, private lang: LanguageService) {}

<<<<<<< HEAD
  // languageCode is optional short code like 'en'|'ar'|'fr'|'zh'
  getMovies(page: number = 1, languageCode?: string): Observable<Imovie[]> {
    const lang = languageCode
      ? this.lang.getTmdbLanguage(languageCode as any)
      : this.lang.getTmdbLanguage();
    return this.http
      .get<{ results: Imovie[] }>(
        `${this.baseURL}?api_key=${this.apiKey}&language=${lang}&page=${page}`
=======
  getMovies(page: number = 1): Observable<{ results: Imovie[]; total_pages: number }> {
    return this.http
      .get<{ results: Imovie[]; total_pages: number }>(
        `${this.baseURL}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=${page}`
>>>>>>> c0d7798a8b57f58e1a48b9d158db44d78d7c444e
      )
      .pipe(map(res => res));
  }

  searchMovies(query: string, page: number = 1): Observable<{ results: Imovie[]; total_pages: number }> {
    return this.http
      .get<{ results: Imovie[]; total_pages: number }>(
        `${this.baseURL}/search/movie?api_key=${this.apiKey}&language=en-US&query=${query}&page=${page}`
      )
      .pipe(map(res => res));
  }

  getMovie(id: number): Observable<Imovie> {
<<<<<<< HEAD
    return this.http.get<Imovie>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`);
  }

  //recommendations
  getRecommendations(id: number): Observable<Imovie[]> {
    return this.http
      .get<{ results: Imovie[] }>(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${this.apiKey}`
      )
      .pipe(map((res) => res.results));
  }

  // search movies by query
  searchMovies(query: string, page: number = 1): Observable<Imovie[]> {
    const encoded = encodeURIComponent(query);
    return this.http
      .get<{ results: Imovie[] }>(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${encoded}&page=${page}`
      )
      .pipe(map((res) => res.results));
=======
    return this.http
      .get<Imovie>(`${this.baseURL}/movie/${id}?api_key=${this.apiKey}&language=en-US`)
      .pipe(map(res => res));
>>>>>>> c0d7798a8b57f58e1a48b9d158db44d78d7c444e
  }
}
