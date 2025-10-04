import { Injectable } from '@angular/core';
import { Imovie } from '../models/imovie';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiKey = 'cdf737fb0a8771a79228a4d738740585';
  private baseURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Imovie[]> {
    return this.http.get<{ results: Imovie[] }>(this.baseURL).pipe(map((res) => res.results));
  }

  getMovie(id: number): Observable<Imovie> {
    return this.http.get<Imovie>(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey} `
    );
  }

  // the following work only if using your own backend API
  addMovie(movie: Imovie): Observable<Imovie> {
    return this.http.post<Imovie>(this.baseURL, movie);
  }

  updateMovie(id: number, newMovie: Imovie): Observable<Imovie> {
    return this.http.put<Imovie>(`${this.baseURL}/${id}`, newMovie);
  }

  deleteMovie(id: number): Observable<unknown> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
