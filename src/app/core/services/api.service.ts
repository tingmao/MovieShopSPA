import { Injectable, getDebugNode } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers: HttpHeaders;
  constructor(protected http:HttpClient) 
  {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
//tell api that send infromation to json format 
  }

  getAll(path: string): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}${path}`).pipe(
      map(resp => resp as any[]),
      catchError(this.handleError)
    );
  }

  getOne(path: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`).pipe(
      map(resp => resp as any),
      catchError(this.handleError)
    );
  }

  create(path: string, resource, options?): Observable<any> {
        return this.http
          .post(`${environment.apiUrl}${path}`, resource, { headers: this.headers })
          .pipe(
            map(response => response),
            catchError(this.handleError)
    );
  }
  // Any non-successfull http status codes such as 400,400,403,404,500,503 etc will be wrapped in HttpErrorResponse
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(error.error.errorMessage);
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.message}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error.error.errorMessage);
  }

}
