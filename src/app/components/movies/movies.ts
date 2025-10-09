import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../shared/movies-service';
import { Imovie } from '../../models/imovie';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../shared/wishlist-service';

@Component({
  selector: 'app-movies',
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
