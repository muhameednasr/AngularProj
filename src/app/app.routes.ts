import { Routes } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RuntimePipe } from './Pipe/runtime-pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';

export const routes: Routes = [
  { path: '', redirectTo: 'movie/634649', pathMatch: 'full' },
{ path: 'login-page', loadComponent: () => import('./components/login-page/login-page').then(c => c.LoginPage) },

  { path: 'movie/:id', loadComponent: () => import('./components/details-page/details-page').then(c => c.DetailsPage) },
  { path: '**', redirectTo: '' }
];
