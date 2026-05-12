import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = 'http://localhost:5000/api/employees';

  constructor(private http: HttpClient) {}

  // TOKEN HEADER
  getHeaders() {

    const token =
      localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };

  }
  // GET ALL
  getEmployees() {

    return this.http.get(
      this.apiUrl,
      this.getHeaders()
    );

  }

  // GET BY ID
getEmployeeById(id: string) {

  return this.http.get(
    `${this.apiUrl}/${id}`
  );

}

  // CREATE
  addEmployee(data: any) {

    return this.http.post(
      this.apiUrl,
      data,
      this.getHeaders()
    );

  }

  // UPDATE
  updateEmployee(id: string, data: any) {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      data,
      this.getHeaders()
    );

  }

   // DELETE
  deleteEmployee(id: string) {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );

  }

  // DASHBOARD STATS
  getStats() {
    return this.http.get(
      `${this.apiUrl}/stats/all`,
      this.getHeaders()
    );
  }

  // PROFILE
getProfile() {

  const token = localStorage.getItem('token');

  return this.http.get(
    'http://localhost:5000/api/employees/me',
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

}

updateProfile(data:any){

  const token = localStorage.getItem('token');

  return this.http.put(
    'http://localhost:5000/api/employees/update-profile',
    data,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

}

}