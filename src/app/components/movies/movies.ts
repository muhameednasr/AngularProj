import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MoviesService } from '../../shared/movies-service';
import { WishlistService } from '../../shared/wishlist-service';
import { Imovie } from '../../models/imovie';
import { LanguageService } from '../../shared/language-service';
import { Subscription, Subject, combineLatest, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movies.html',
  styleUrls: ['./movies.css'],
})
export class Movies {
  movies: Imovie[] = [];
  totalPages = 0;
  currentPage = 1;
  searchQuery = '';
  loading = false;
  private search$ = new Subject<string>();
  pagesToShow: number[] = [];
  favorites: number[] = [];
  private _langSub?: Subscription;
  private _searchSub?: Subscription;

  constructor(
    private movieService: MoviesService,
    private wishlistService: WishlistService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.fetchMovies();
    this.startLanguageListener();
    this.startSearchListener();
  }

  ngOnDestroy(): void {
    this._langSub?.unsubscribe();
    this._searchSub?.unsubscribe();
  }

  fetchMovies(): void {
    this.loading = true;
    // log fetch for runtime verification
    try {
      // read the current language for debugging
      const currentLang = this.languageService.getLanguage();
      console.log(
        `[Movies] fetchMovies() - page=${this.currentPage} language=${currentLang} searchQuery='${this.searchQuery}'`
      );
    } catch (e) {
      // ignore in non-browser env
    }
    const obs = this.searchQuery
      ? this.movieService.searchMovies(this.searchQuery, this.currentPage)
      : this.movieService.getMovies(this.currentPage);
    obs.subscribe({
      next: (res: any) => {
        this.movies = res.results || [];
        this.totalPages = Math.min(res.total_pages || 1, 19);
        this.updatePagination();
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  // start listening for language changes and re-fetch
  startLanguageListener(): void {
    this._langSub = this.languageService.currentLanguage$.subscribe(() => {
      // when language changes, reset to first page and fetch again
      this.currentPage = 1;
      this.fetchMovies();
    });
  }

  // Start search listener that debounces input and also reacts to language changes
  startSearchListener(): void {
    // Combine the debounced search term stream with language changes so language toggles re-run the current search
    const debounced = this.search$.pipe(debounceTime(300), distinctUntilChanged());

    this._searchSub = combineLatest([debounced, this.languageService.currentLanguage$])
      .pipe(
        // when either search term or language changes, run the search logic
        switchMap(([term]) => {
          this.loading = true;
          this.currentPage = 1;
          this.searchQuery = term;
          const obs =
            term && term.trim() !== ''
              ? this.movieService.searchMovies(term, this.currentPage)
              : this.movieService.getMovies(this.currentPage);
          return obs.pipe(catchError(() => of({ results: [], total_pages: 1 })));
        })
      )
      .subscribe((res: any) => {
        this.movies = res.results || [];
        this.totalPages = Math.min(res.total_pages || 1, 19);
        this.updatePagination();
        this.loading = false;
      });
  }

  updatePagination(): void {
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(start + 4, this.totalPages);
    this.pagesToShow = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  onSearch(): void {
    // push current value into the search stream (immediate trigger)
    this.search$.next(this.searchQuery || '');
  }

  // called from template on every input event
  onSearchInput(value: string): void {
    this.search$.next(value || '');
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.fetchMovies();
  }

  addToWishlist(movie: Imovie): void {
    this.wishlistService.addToWishlist(movie);
  }

  toggleFavorite(movie: Imovie): void {
    const i = this.favorites.indexOf(movie.id);
    if (i > -1) this.favorites.splice(i, 1);
    else this.favorites.push(movie.id);
  }

  isFavorite(movie: Imovie): boolean {
    return this.favorites.includes(movie.id);
  }

  // wishlist helpers
  isInWishlist(movie: Imovie): boolean {
    try {
      return this.wishlistService && this.wishlistService['getWishlist']
        ? (this.wishlistService as any)._wishlist$.value.some((m: Imovie) => m.id === movie.id)
        : false;
    } catch (e) {
      return false;
    }
  }

  toggleWishlist(movie: Imovie): void {
    if (this.isInWishlist(movie)) {
      this.wishlistService.removeFromWishlist(movie.id);
    } else {
      this.wishlistService.addToWishlist(movie);
    }
  }

  toggleWishlistEvent(event: Event, movie: Imovie) {
    event.stopPropagation();
    event.preventDefault();
    this.toggleWishlist(movie);
  }
}
