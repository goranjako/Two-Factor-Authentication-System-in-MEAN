import { Injectable, ErrorHandler } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SwalService } from '../shared/swal.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userid: any;
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private toast: SwalService) {}
  //Register
  register(user: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl + '/register', user)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  //Verify
  verify(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/verify', data).pipe(
      map((token) => {
        if (token) {
          localStorage.setItem('usertoken', JSON.stringify(token));
        }
        return data;
      })
    );
  }
  //Login
  login(authCredentials: any) {
    return this.http.post<any>(this.apiUrl + '/login', authCredentials).pipe(
      map((user) => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('usertoken', JSON.stringify(user));
        }
        return user;
      })
    );
  }
  //Logaut

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('usertoken');
    this.toast.success('Logout Successful!');
  }

  //GetToken
  getToken() {
    const token: any = localStorage.getItem('usertoken');
    const decode = jwt_decode(token);
    return decode;
  }
  //LoggedIn
  public isLoggedIn() {
    const token = localStorage.getItem('usertoken') !== null;
    return token;
  }

  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return errorMessage;
  }
}
