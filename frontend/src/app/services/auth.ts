import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  api = 'https://fullstack-employee-crud.onrender.com/api/auth';
<<<<<<< HEAD
=======
  // api = 'http://localhost:5000/api/auth';
>>>>>>> 29f7c85b (fixed angular build and deployment issues)

  constructor(private http: HttpClient) {}

login(data: any) {
  return this.http.post<any>(
    'https://fullstack-employee-crud.onrender.com/api/auth/login',
<<<<<<< HEAD
=======
    // 'http://localhost:5000/api/auth/login',
>>>>>>> 29f7c85b (fixed angular build and deployment issues)
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
