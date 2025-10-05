import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Imovie } from '../models/imovie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '0c4573fb571a2cb3436d7544e843d003'; // Api Key
  // private
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // details
  getMovieDetails(id: number): Observable<Imovie> {
    return this.http.get<Imovie>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`
    );
  }

 //recommendations
  getRecommendations(id: number): Observable<Imovie[]> {
    return this.http
      .get<{ results: Imovie[] }>(
        `${this.baseUrl}/movie/${id}/recommendations?api_key=${this.apiKey}`
      )
      .pipe(map(res => res.results));
  }

  getVideos(id: number): Observable<{ key: string; type: string; name: string }[]> {
    return this.http
      .get<{ results: { key: string; type: string; name: string }[] }>(
        `${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(map(res => res.results));
  }
// Mock function for testing without API
  getMockMovieDetails(id: number): Observable<Imovie> {
    const mock: Imovie = {
      id,
      title: 'Black Widow',
      poster_path: '/kqjL17yufvn9OVLyXYpvtyrFfak.jpg',
      overview: 'Natasha Romanoff ...',
      release_date: '2017-09-25',
      vote_average: 7.1,
      vote_count: 9288,
      genres: [{ id: 28, name: 'Action' }, { id: 80, name: 'Crime' }],
      runtime: 134,
      spoken_languages: [{ english_name: 'English' }],
      production_companies: [{ name: 'Marvel Studios', logo_path: null }],
      homepage: 'https://www.marvel.com'
    };
    return of(mock).pipe(delay(300));
  }
}
