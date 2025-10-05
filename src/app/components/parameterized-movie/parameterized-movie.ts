import { Component } from '@angular/core';
import { Imovie } from '../../models/imovie';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../shared/movies-service';
import { WishlistService } from '../../shared/wishlist-service';

@Component({
  selector: 'app-parameterized-movie',
  imports: [],
  templateUrl: './parameterized-movie.html',
  styleUrl: './parameterized-movie.css'
})
export class ParameterizedMovie {
 id: number | null = null;
  movie: Imovie | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(public activatedRoute: ActivatedRoute, private movieService: MoviesService,private wishlistService:WishlistService) {}

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
  addToWishList(movie: Imovie, btnAdd: HTMLElement) {
    this.wishlistService.addToWishlist(movie);
    btnAdd.style.textDecorationLine = 'line-through;';
    btnAdd.style.backgroundColor = 'grey';
    btnAdd.innerHTML += `✅`;
  }
}
