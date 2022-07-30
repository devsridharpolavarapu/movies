import { Component, OnInit } from '@angular/core';
import { Genre } from '../models/genre.model';
import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie.service';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/User';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  private genres: Array<Genre>;
  totalPages: Number;
  currentUser: User;
  nowPlaying: Array<Movie>;
  currentPage: Number;
  isLoading: boolean;

  constructor(private movieService: MovieService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.movieService.getGenres().subscribe(res => {
      this.genres = res.data;
      this.getNowPlayingMovies(1);
    });
    this.currentUser = this.authenticationService.currentUserValue;
  }

  getNowPlayingMovies(page: number) {
    this.isLoading = true;
    this.movieService.getNowPlaying(page).pipe(take(1)).subscribe(
      res => {
        this.totalPages = res.data.total_pages;
        res.data.results.forEach(x => {
          x.genres = [];
          x.genre_ids.forEach(y => {
            var genre = this.genres.find(function (value, index) {
              return value.id == y;
            });
            if (genre) {
              x.genres.push(genre.name);
            }

          });

          this.nowPlaying = res.data.results;
          this.currentPage = res.data.page
          this.isLoading = false;
        })

      }, () => {
        this.isLoading = false;
      }
    );
  }

  logout() {
    this.authenticationService.logout();
  }

}
