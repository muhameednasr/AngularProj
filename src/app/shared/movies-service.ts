import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Imovie } from '../models/imovie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey = 'cdf737fb0a8771a79228a4d738740585';
  private baseURL = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getMovies(page: number = 1): Observable<{ results: Imovie[]; total_pages: number }> {
    return this.http
      .get<{ results: Imovie[]; total_pages: number }>(
        `${this.baseURL}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=${page}`
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
    return this.http
      .get<Imovie>(`${this.baseURL}/movie/${id}?api_key=${this.apiKey}&language=en-US`)
      .pipe(map(res => res));
  }
}
