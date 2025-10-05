import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),       
    provideHttpClient(),         
    provideAnimations(),         
    importProvidersFrom(MatSnackBarModule)
  ]
});
