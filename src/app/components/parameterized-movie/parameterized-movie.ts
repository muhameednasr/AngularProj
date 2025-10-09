import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Imovie } from '../../models/imovie';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../shared/movies-service';
import { WishlistService } from '../../shared/wishlist-service';

@Component({
  selector: 'app-parameterized-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parameterized-movie.html',
  styleUrls: ['./parameterized-movie.css']
})
export class ParameterizedMovie {
  id: number | null = null;
  movie: Imovie | null = null;
  loading: boolean = false;
  error: string = '';

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
      next: (data: Imovie) => {
        this.movie = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        this.error = 'Failed to load movie details.';
        console.error(err);
      },
    });
  }

  addToWishList(movie: Imovie, btnAdd: HTMLElement) {
    this.wishlistService.addToWishlist(movie);
    btnAdd.style.textDecoration = 'line-through';
    btnAdd.style.backgroundColor = 'grey';
    btnAdd.innerHTML += ` ✅`;
  }
}
