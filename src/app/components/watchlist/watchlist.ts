import { Component } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { WishlistService } from '../../shared/wishlist-service';
import { Observable } from 'rxjs';
import { Imovie } from '../../models/imovie';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule, NgForOf, NgIf],

  // template and styles live in the sibling `wishlist` folder; reference them explicitly
  templateUrl: '../wishlist/watchlist.html',
  // styleUrls: ['../wishlist/watchlist.css'],
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

// Backwards-compatibility alias: export the same alias here as well
export { Watchlist as Wishlist };
