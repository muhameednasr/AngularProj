import { Component, OnInit, OnDestroy } from '@angular/core';
import { Imovie } from '../../models/imovie';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { WishlistService } from '../../auth/wishlist-service';
import { MovieService } from '../../auth/movie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RuntimePipe } from '../../Pipe/runtime-pipe';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../auth/auth-service';
@Component({
  selector: 'app-details-page',
  standalone: true, // ✅ مهم في Angular 17+
  imports: [
    MatIcon,
    MatButtonModule,
    FormsModule,
    DatePipe,
    RuntimePipe,
    MatSnackBarModule,
    NgFor,
    NgIf
  ],
  templateUrl: './details-page.html',
  styleUrl: './details-page.css'
})
export class DetailsPage implements OnInit, OnDestroy {
  movie?: Imovie;
  recs: Imovie[] = [];
  private sub = new Subscription();

  // ⭐ التقييم
  userRating = 0;             
  stars = Array(5).fill(0);   
  constructor(
  private route: ActivatedRoute,
  private movieService: MovieService,
  private snack: MatSnackBar,
  private titleService: Title,
  private router: Router,
  public wishlist: WishlistService,
  private auth: AuthService   
) {}


  ngOnInit() {
    this.sub.add(
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id') || 634649); // ID افتراضي لو مفيش param

        this.movieService.getMovieDetails(id).subscribe(m => {
          this.movie = m;
          this.titleService.setTitle(m.title || 'Details');

          const saved = localStorage.getItem(`rating_${m.id}`);
          if (saved) this.userRating = +saved;
        });

        this.movieService.getRecommendations(id).subscribe(r => (this.recs = r));
      })
    );
  }

  // rating
 rate(value: number) {
  if (!this.auth.isLoggedIn()) {
    this.router.navigate(['/login-page']); // redirect to login
    return;
  }

  this.userRating = value;
  if (this.movie) {
    localStorage.setItem(`rating_${this.movie.id}`, value.toString());
  }
}

toggleWishlist() {
  if (!this.auth.isLoggedIn()) {
    this.router.navigate(['/login-page']); // redirect to login
    return;
  }

  if (!this.movie) return;
  this.wishlist.toggle(this.movie.id);
  this.snack.open(
    this.wishlist.isInWishlist(this.movie.id)
      ? 'Added to wishlist'
      : 'Removed from wishlist',
    '',
    { duration: 2000 }
  );
}


  navigateTo(id: number) {
    this.router.navigate(['/movie', id]);
  }

  getPosterUrl(path?: string) {
    return path
      ? `https://image.tmdb.org/t/p/w500${path}`
      : 'assets/no-poster.png';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
