import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  wishlist: any;
  count: number = 0;

  ngOnInit() {
    this.wishlist?.list$?.subscribe((list: string | any[]) => this.count = list.length);
  }
}
