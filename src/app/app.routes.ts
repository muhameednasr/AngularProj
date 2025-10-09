import { Routes } from '@angular/router';
import { Movies } from './components/movies/movies';
import { ParameterizedMovie } from './components/parameterized-movie/parameterized-movie';
import { authGuardGuard } from './auth/auth-guard-guard';
import { Watchlist } from './components/watchlist/watchlist';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

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

  { path: 'wishlist', component: Watchlist, title: 'wishlist', canActivate: [authGuardGuard] },
  { path: 'login', component: Login, title: 'Login', canActivate: [authGuardGuard] },
  { path: 'Register', component: Register, title: 'Register', canActivate: [authGuardGuard] },











];
