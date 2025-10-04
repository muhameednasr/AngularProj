import { Routes } from '@angular/router';
import { Movies } from './components/movies/movies';
import { ParameterizedMovie } from './components/parameterized-movie/parameterized-movie';
import { authGuardGuard } from './auth/auth-guard-guard';
import { Watchlist } from './components/watchlist/watchlist';

export const routes: Routes = [
  {
    path: '',
    component: Movies,
    title: 'home',
  },
  {
    path: 'movies/:id',
    component: ParameterizedMovie,
    title: 'movie',
  },

  { path: 'watchlist', component: Watchlist, title: 'watchlist', canActivate: [authGuardGuard] },
];
