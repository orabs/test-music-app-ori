import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  of 
} from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { ErrorHandlingService } from './error-handle.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {

  constructor(private errorHandlingService: ErrorHandlingService, private http: HttpClient, private authService: AuthService) {}
  private readonly SPOTIFY_API_TOKEN: string = 'https://accounts.spotify.com/api/token';

  getAccessToken(): Observable < any > {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams().
    set('grant_type', 'client_credentials').
    set('client_id', environment.clientId, ).
    set('client_secret', environment.clientSecret)

    return this.http.post(this.SPOTIFY_API_TOKEN, body, {
      headers
    }).pipe(
      catchError(error => this.errorHandlingService.handleError(error))
    )
  }

  getAlbumsApi(query: string, limit: number, offset: number): Observable < any > {
    if (!this.authService.getToken()) {
      const error = new HttpErrorResponse({
        status: 401,
        statusText: 'Authorization token is missing. Please log in.'
      });
      this.errorHandlingService.handleError(error);
      return of();
    }
    const headers = this.authService.getAuthHeaders();
    return this.http.get(`https://api.spotify.com/v1/search?q=${query}&type=album&limit=${limit}&offset=${offset}`, {
      headers
    }).pipe(
      debounceTime(20000),
      distinctUntilChanged(),
      catchError(error => this.errorHandlingService.handleError(error))
    );
  }
}
