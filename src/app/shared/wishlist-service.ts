import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private key = 'movie_wishlist';
  private list: number[] = JSON.parse(localStorage.getItem(this.key) || '[]');
  private subj = new BehaviorSubject<number[]>([...this.list]);
  list$ = this.subj.asObservable();

  isInWishlist(id: number) {
    return this.list.includes(id);
  }

  toggle(id: number) {
    if (this.isInWishlist(id)) {
      this.list = this.list.filter((i) => i !== id);
    } else {
      this.list.push(id);
    }
    localStorage.setItem(this.key, JSON.stringify(this.list));
    this.subj.next([...this.list]);
  }

  getAll() {
    return [...this.list];
  }
}
