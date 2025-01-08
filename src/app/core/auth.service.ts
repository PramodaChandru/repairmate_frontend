import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSource = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSource.asObservable();

  private apiUrl = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) {
    if(localStorage.getItem('id')) {
      this.loggedInSource.next(true);
    }
   } 

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          if(response?.id && response?.email) {
            localStorage.setItem("id", response.id);
            localStorage.setItem("user", response.email);
            this.loggedInSource.next(true);
          }
        })
      )
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user)
  }

  logout(): void {
    localStorage.removeItem("id");
    localStorage.removeItem("user");
    this.loggedInSource.next(false); 
  }
}
