import { Component, OnInit } from '@angular/core';
import { Imovie } from '../../models/imovie';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../shared/movies-service';
import { WishlistService } from '../../shared/wishlist-service';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
// import { RuntimePipe } from "../../Pipe/runtime-pipe";
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-parameterized-movie',
  standalone: true,
  imports: [NgIf, NgFor, MatIconModule,MatButtonModule, CommonModule, MatSnackBarModule  ],
  templateUrl: './parameterized-movie.html',
  styleUrls: ['./parameterized-movie.css']
})
export class ParameterizedMovie implements OnInit {

  id: number | null = null;
  movie: Imovie | null = null;
  loading = false;
  error = '';
  recs: Imovie[] = [];
  private sub = new Subscription();
  userRating = 0;
  stars = Array(5).fill(0);

  inWishlist = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService,
    private wishlistService: WishlistService,
    private router: Router,
      private snackBar: MatSnackBar, 

  ) {}

 ngOnInit(): void {
  this.snackBar.open('Snackbar test message', 'Close', {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  });
  // 🟢 أول مرة الصفحة تفتح
  this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  this.loadMovie(this.id);

  // 🟢 لما يتغير الـ id بعد كده (بدون reload)
  this.activatedRoute.paramMap.subscribe(params => {
    const newId = Number(params.get('id'));
    if (newId && newId !== this.id) {
      this.id = newId;
      this.loadMovie(newId);
    }
  });
}

private loadMovie(id: number): void {
  this.movieService.getMovie(id).subscribe({
    next: (data) => {
      this.movie = data;

      // save user rating if exists
      const savedRating = localStorage.getItem(`rating_${id}`);
      if (savedRating) this.userRating = +savedRating;

      // update wishlist status
      const wishlist = this.wishlistService['_wishlist$'].value;
      this.inWishlist = wishlist.some(m => m.id === id);
      
       this.movieService.getRecommendations(id).subscribe({
        next: (recs) => {
          console.log('✅ Recommendations:', recs);
          this.recs = recs;
        },
        error: (err) => {
          console.error(' Error loading recommendations:', err);
        }
      });
    },
    
    error: (err) => {
      console.error(' Error loading movie:', err);
      this.error = 'Failed to load movie details.';
    }
  });
}

  fetchMovie() {
    if (!this.id) return;
    this.loading = true;

    this.movieService.getMovie(this.id).subscribe({
      next: (data) => {
        this.movie = data;
        this.loading = false;

        const wishlist = this.wishlistService['_wishlist$'].value;
        this.inWishlist = wishlist.some(m => m.id === this.movie?.id);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message || 'Failed to load movie.';
      }
    });
  }


getPosterUrl(path?: string) {
    return path
      ? `https://image.tmdb.org/t/p/w500${path}`
      : 'assets/no-poster.png';
  }
  navigateTo(id: number) {
    this.router.navigate(['/movie', id]);
  }
  // rating
  rate(value: number) {
    this.userRating = value;
    if (this.movie) {
      localStorage.setItem(`rating_${this.movie.id}`, value.toString());
    }
  }
  
 aaddToWishList(movie: Imovie) {
  if (!movie) return;

  const currentList = this.wishlistService['_wishlist$'].value;
  const exists = currentList.some(m => m.id === movie.id);

  if (exists) {
    this.wishlistService.removeFromWishlist(movie.id);
    this.inWishlist = false;

    this.snackBar.open(' Removed from wishlist', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snack-error']
    });
  } else {
    this.wishlistService.addToWishlist(movie);
    this.inWishlist = true;
    this.snackBar.open('Added to wishlist', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snack-success']
    });
  }
}



}
