import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  throwError
} from 'rxjs';
import {
  environment
} from '../../environments/environment';
import {
  AlbumDetails
} from '../models/albums';
import {
  AuthService
} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {

  constructor(private http: HttpClient, private authService: AuthService) {}
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
    })
  }

  getAlbumsApi(query: string, limit: number, offset: number): Observable < any > {
    if (!this.authService.getToken()) {
      return throwError(() => new Error('Token is missing'));
    }
    const headers = this.authService.getAuthHeaders();
    return this.http.get(`https://api.spotify.com/v1/search?q=${query}&type=album&limit=${limit}&offset=${offset}`, {
      headers
    }).pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      catchError(error => {
        console.error('Error searching albums:', error);
        return throwError(() => new Error('Failed to search albums'));
      })
    );
  }
}
