import { Routes } from '@angular/router';
import { Movies } from './components/movies/movies';
// ParameterizedMovie will be lazy-loaded with loadComponent
import { authGuardGuard } from './auth/auth-guard-guard';
import { Watchlist } from './components/wishlist/watchlist';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const routes: Routes = [
  {
    path: '',
    component: Movies,
    title: 'home',
  },
  { path: 'login', component: Login, title: 'login' },
  { path: 'register', component: Register, title: 'register' },
  {
    path: 'search',
    loadComponent: () =>
      import('./components/search-results/search-results').then((m) => m.SearchResults),
    title: 'search',
  },
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./components/parameterized-movie/parameterized-movie').then(
        (m) => m.ParameterizedMovie
      ),
    title: 'movie',
  },

  // canonical wishlist route (guarded)
  { path: 'wishlist', component: Watchlist, title: 'wishlist', canActivate: [authGuardGuard] },
  {
    path: 'account',
    loadComponent: () => import('./components/account/account').then((m) => m.Account),
    title: 'account',
    canActivate: [authGuardGuard],
  },
];
