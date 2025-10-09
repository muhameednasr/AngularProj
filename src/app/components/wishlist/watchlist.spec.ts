import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Watchlist } from './watchlist';

describe('Watchlist', () => {
  let component: Watchlist;
  let fixture: ComponentFixture<Watchlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Watchlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Watchlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
