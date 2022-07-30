import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { User } from '../models/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private baseUrl: string;


  constructor(private http: HttpClient, private router: Router,) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.baseUrl = environment.apiURL;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email, password) {

    return this.http.post<any>(this.baseUrl + `/user/login`,
      JSON.stringify({ 'email': email, 'password': password }), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(map(response => {
        if (response.success) {
          localStorage.setItem('currentUser', JSON.stringify(response.data));
          this.currentUserSubject.next(response.data);
        }

        return response;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
