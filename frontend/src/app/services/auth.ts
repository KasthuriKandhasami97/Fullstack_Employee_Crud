import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  api = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

login(data: any) {
  return this.http.post<any>(
    'http://localhost:5000/api/auth/login',
    data
  );

}

  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}