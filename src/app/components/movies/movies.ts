import { Component } from '@angular/core';
<<<<<<< HEAD
import { Observable } from 'rxjs';
=======
import { CommonModule } from '@angular/common';
>>>>>>> c0d7798a8b57f58e1a48b9d158db44d78d7c444e
import { MoviesService } from '../../shared/movies-service';
import { LanguageService, LangCode } from '../../shared/language-service';
import { Imovie } from '../../models/imovie';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { CommonModule, NgForOf, NgIf, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
=======
import { RouterModule } from '@angular/router';
>>>>>>> c0d7798a8b57f58e1a48b9d158db44d78d7c444e
import { WishlistService } from '../../shared/wishlist-service';
import { map } from 'rxjs';

@Component({
  selector: 'app-movies',
<<<<<<< HEAD
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
=======
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movies.html',
  styleUrls: ['./movies.css']
})
export class Movies {
  movies: Imovie[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  searchQuery: string = '';
  loading: boolean = false;
  pagesToShow: number[] = [];

  constructor(private movieService: MoviesService, private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  /** 🔹 جلب قائمة الأفلام */
  fetchMovies(): void {
    this.loading = true;
    const observable = this.searchQuery
      ? this.movieService.searchMovies(this.searchQuery, this.currentPage)
      : this.movieService.getMovies(this.currentPage);

    observable.subscribe({
      next: (res: any) => {
        this.movies = res.results;
        this.totalPages = Math.min(res.total_pages, 19); // 19 صفحة كحد أقصى
        this.updatePagination();
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.loading = false;
      }
    });
>>>>>>> c0d7798a8b57f58e1a48b9d158db44d78d7c444e
  }

  /** 🔹 تحديث أرقام الصفحات */
  updatePagination(): void {
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(start + 4, this.totalPages);
    this.pagesToShow = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  /** 🔹 البحث */
  onSearch(): void {
    this.currentPage = 1;
    this.fetchMovies();
  }

  /** 🔹 الانتقال بين الصفحات */
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.fetchMovies();
  }

  /** 🔹 لون التقييم */
  getRatingColor(vote: number): string {
    if (vote >= 7) return 'green';
    if (vote >= 5) return 'orange';
    return 'red';
  }

  /** 💖 الإضافة إلى قائمة الأمنيات */
  addToWishlist(movie: Imovie, event: Event): void {
    const btn = event.target as HTMLElement;
    if (!btn) return;

    this.wishlistService.addToWishlist(movie);
    btn.innerHTML = 'Added ✅';
    btn.style.backgroundColor = '#777';
    btn.style.cursor = 'not-allowed';
  }
  favorites: number[] = [];

toggleFavorite(movie: Imovie): void {
  const index = this.favorites.indexOf(movie.id);
  if (index > -1) {
    this.favorites.splice(index, 1);
  } else {
    this.favorites.push(movie.id);
  }
}

isFavorite(movie: Imovie): boolean {
  return this.favorites.includes(movie.id);
}

}
