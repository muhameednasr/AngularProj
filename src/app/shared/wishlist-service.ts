import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Imovie } from '../models/imovie';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
private _wishlist$ = new BehaviorSubject<Imovie[]>([]);
readonly wishlist$: Observable<Imovie[]> = this._wishlist$.asObservable();

private _total$ = new BehaviorSubject<number>(0);
readonly total$: Observable<number> = this._total$.asObservable();

addToWishlist(movie: Imovie) {
  const currentWishlist = this._wishlist$.value;

  
  const exists = currentWishlist.some(p => p.id === movie.id);

  if (!exists) {
    const updatedWishlist = [...currentWishlist, movie];
    this._wishlist$.next(updatedWishlist);
    this._total$.next(updatedWishlist.length);
  }
}

  removeFromWishlist(id: number) {
    const updatedCart = this._wishlist$.value.filter((p) => p.id !== id);
    this._wishlist$.next(updatedCart);
    if (this._total$.value > 0) {
      this._total$.next(this._total$.value - 1);
    }
  }
  clearWishlist() {
    this._wishlist$.next([]);
  }
  getWishlist() {
    return this.wishlist$;
  }


}
