import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteMovies } from './favourite-movies';

describe('FavouriteMovies', () => {
  let component: FavouriteMovies;
  let fixture: ComponentFixture<FavouriteMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteMovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteMovies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
