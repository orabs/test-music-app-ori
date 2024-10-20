import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifySearchService {

  constructor(private http: HttpClient) {}

  private token: string = '';
  private readonly SPOTIFY_API_TOKEN: string = 'https://accounts.spotify.com/api/token';

  getAccessToken(): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams().
      set('grant_type','client_credentials').
      set('client_id', environment.clientId,).
      set('client_secret', environment.clientSecret)

    return this.http.post(this.SPOTIFY_API_TOKEN, body, { headers })
  }

  searchAlbums(query: string): Observable<any> {
    if (!this.token) {
      return throwError(() => new Error('Token is missing'));
    }
    const headers = this.getAuthHeaders();
    return this.http.get(`https://api.spotify.com/v1/search?q=${query}&type=album`, { headers }).pipe(
      catchError(error => {
        console.error('Error searching albums:', error);
        return throwError(() => new Error('Failed to search albums'));
      })
    );
  }

  setToken(token: string) {
    this.token = token;
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
  }


  
}
