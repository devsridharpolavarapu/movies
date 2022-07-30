import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;
  http: HttpClient;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiURL;
    this.http = httpClient;
  }


  register(user: User) {
    return this.http.post(`${this.baseUrl}/user/register`, user);

  }
}