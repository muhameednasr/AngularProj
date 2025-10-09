import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Imovie } from '../../models/imovie';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../shared/movies-service';
import { WishlistService } from '../../shared/wishlist-service';

@Component({
  selector: 'app-parameterized-movie',
  imports: [CommonModule, NgIf],
  templateUrl: './parameterized-movie.html',
  styleUrls: ['./parameterized-movie.css'],
})
export class ParameterizedMovie {
  id: number | null = null;
  movie: Imovie | null = null;
  loading: boolean = false;
  error: string = '';
  added = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    private movieService: MoviesService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.fetchMovie();
  }

  fetchMovie() {
    this.loading = true;

    this.movieService.getMovie(Number(this.id)).subscribe({
      next: (data) => {
        this.movie = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = err;
      },
    });
  }
  addToWishList(movie: Imovie) {
    this.wishlistService.addToWishlist(movie);
    this.added = true;
  }
}
