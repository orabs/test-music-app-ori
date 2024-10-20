import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = '';

  constructor() { }

  getToken(): string{
    return this.token
  }

  setToken(token: string){
    this.token = token;
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken()
    });
  }
}
