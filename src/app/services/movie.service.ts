import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  baseUrl: string;
  http: HttpClient;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiURL;
    this.http = httpClient;
  }

  getNowPlaying(page: number): Observable<any> {
    var queryString = "";
    if (page) {
      queryString = "?page=" + page;
    }
    return this.http.get(`${this.baseUrl}/movies/nowplaying` + queryString, { withCredentials: true });
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}/genres`, { withCredentials: true });
  }
}
