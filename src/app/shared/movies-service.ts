import { Injectable } from '@angular/core';
import { Imovie } from '../models/imovie';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LanguageService } from './language-service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiKey = 'cdf737fb0a8771a79228a4d738740585';
  private baseURL = `https://api.themoviedb.org/3/movie/now_playing`;

  constructor(private http: HttpClient, private lang: LanguageService) {}

  // languageCode is optional short code like 'en'|'ar'|'fr'|'zh'
  getMovies(page: number = 1, languageCode?: string): Observable<Imovie[]> {
    const lang = languageCode
      ? this.lang.getTmdbLanguage(languageCode as any)
      : this.lang.getTmdbLanguage();
    return this.http
      .get<{ results: Imovie[] }>(
        `${this.baseURL}?api_key=${this.apiKey}&language=${lang}&page=${page}`
      )
      .pipe(map((res) => res.results));
  }

  getMovie(id: number): Observable<Imovie> {
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
  }

  // addMovie(movie: Imovie): Observable<Imovie> {
  //   return this.http.post<Imovie>(this.baseURL, movie);
  // }

  // updateMovie(id: number, newMovie: Imovie): Observable<Imovie> {
  //   return this.http.put<Imovie>(`${this.baseURL}/${id}`, newMovie);
  // }

  // deleteMovie(id: number): Observable<unknown> {
  //   return this.http.delete(`${this.baseURL}/${id}`);
  // }
}
