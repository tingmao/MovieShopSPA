import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { MovieCard } from 'src/app/shared/models/movie-card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies:MovieCard[];
  genreId:number;
  constructor(private movieService:MovieService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(
      param=>{
        this.genreId=+param.get('id');
        // console.log(this.genreId);
        this.movieService.getMoviesByGenre(this.genreId).subscribe(
          m=>{
            this.movies=m;
            // console.log(this.movies);
          }
        )
      }
    );
  }

}
