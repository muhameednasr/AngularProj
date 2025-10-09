import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from '../../shared/movies-service';
import { LanguageService, LangCode } from '../../shared/language-service';
import { Imovie } from '../../models/imovie';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgForOf, NgIf, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { WishlistService } from '../../shared/wishlist-service';
import { map } from 'rxjs';

@Component({
  selector: 'app-movies',
  imports: [FormsModule, CommonModule, NgForOf, NgIf, NgStyle, RouterLink],
  templateUrl: './movies.html',
  styleUrls: ['./movies.css'],
})
export class Movies {
  movies$!: Observable<Imovie[]>;
  wishlistSet = new Set<number>();

  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];

  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private movieService: MoviesService,
    private wishListService: WishlistService,
    private languageService: LanguageService,
    private router: Router
  ) {}

  // search navigation
  searchQuery = '';
  // track selected movie id for UI selection (one at a time)
  selectedId: number | null = null;
  // (we use wishlistSet to derive heart state)

  trackById(index: number, item: Imovie) {
    return item.id;
  }

  addtowishlist(movie: Imovie) {
    this.wishListService.addToWishlist(movie);
  }

  select(movie: Imovie) {
    // toggle selection: select or deselect
    this.selectedId = this.selectedId === movie.id ? null : movie.id;
  }

  toggleHeart(movie: Imovie, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const exists = this.wishlistSet.has(movie.id);
    if (exists) {
      this.wishListService.removeFromWishlist(movie.id);
    } else {
      this.wishListService.addToWishlist(movie);
    }
  }
  ngOnInit(): void {
    // request initial movies using the current language (via LanguageService)
    const initial = this.languageService.getLanguage() ?? 'en';
    this.movies$ = this.movieService.getMovies(1, initial as any);

    // subscribe to language changes and re-request movies
    this.languageService.currentLanguage$.subscribe((code: LangCode) => {
      this.movies$ = this.movieService.getMovies(1, code);
    });
    this.wishListService.wishlist$.subscribe((list) => {
      this.wishlistSet.clear();
      list.forEach((m) => this.wishlistSet.add(m.id));
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      const current = this.languageService.getLanguage();
      this.movies$ = this.movieService.getMovies(page, current as any);
    }
  }

  doSearch() {
    if (this.searchQuery && this.searchQuery.trim().length > 0) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery.trim() } });
    }
  }

  getRatingColor(vote: number): string {
    const percent = vote * 10;
    if (percent >= 70) {
      return `conic-gradient(#21d07a ${percent * 3.6}deg, #204529 0deg)`;
    } else if (percent >= 50) {
      return `conic-gradient(#d2d531 ${percent * 3.6}deg, #423d0f 0deg)`;
    } else {
      return `conic-gradient(#db2360 ${percent * 3.6}deg, #571435 0deg)`;
    }
  }
}
