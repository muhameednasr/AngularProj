import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    // Map logical types to Material theme classes so the snackbar uses the app's theme colors
    const classMap: Record<string, string> = {
      success: 'mat-mdc-theme-primary',
      error: 'mat-mdc-theme-warn',
      info: 'mat-mdc-theme-accent',
    };
    const panelClass = classMap[type] ? [classMap[type]] : undefined;
    const config: MatSnackBarConfig = { duration: 3000, panelClass } as MatSnackBarConfig;
    this.snackBar.open(message, undefined, config);
  }
}
