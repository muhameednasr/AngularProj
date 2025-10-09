import { Component } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { WishlistService } from '../../shared/wishlist-service';
import { Observable } from 'rxjs';
import { Imovie } from '../../models/imovie';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule, NgForOf, NgIf],

  templateUrl: './watchlist.html',
  styleUrls: ['./watchlist.css'],
})
export class Watchlist {
  wishlist$!: Observable<Imovie[]>;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlist$ = this.wishlistService.getWishlist();
  }

  remove(id: number) {
    this.wishlistService.removeFromWishlist(id);
  }
}

// Backwards-compatibility alias: some code/tests import { Wishlist }
// while the class is named Watchlist. Export an alias to satisfy both.
export { Watchlist as Wishlist };
