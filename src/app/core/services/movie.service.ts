import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { MovieCard } from 'src/app/shared/models/movie-card';
import { MovieDetails } from 'src/app/shared/models/movie-details';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private apiService: ApiService) { }

  getTopRevenueMovies(): Observable<MovieCard[]> {
    return this.apiService.getAll('/movies/toprevenue');
  }

  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.apiService.getOne('/movies/'+id);
  }
  getMoviesByGenre(genreId: number): Observable<MovieCard[]> {
    return this.apiService.getAll(`${'/movies/genre/'}${genreId}`);
  }
}
