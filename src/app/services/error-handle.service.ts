import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ErrorMessage {
  [key: number]: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  private errorMessages: ErrorMessage = {
    400: 'Bad Request - Please check your input',
    401: 'Unauthorized - Please log in again',
    403: 'Forbidden - You don\'t have permission to access this resource',
    404: 'Not Found - The requested resource was not found',
    500: 'Internal Server Error - Please try again later',
    503: 'Service Unavailable - Please try again later'
  };

  constructor(private snackBar: MatSnackBar) { }

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error?.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = this.errorMessages[error.status] || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('Error occurred:', error);
    this.showErrorNotification(errorMessage);
    return throwError(() => errorMessage);
  }

  private showErrorNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
}