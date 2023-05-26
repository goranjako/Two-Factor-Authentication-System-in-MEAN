import { Injectable, ErrorHandler } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Contact } from './contact';
import { SwalService } from '../shared/swal.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // tslint:disable-next-line:object-literal-key-quotes
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  ContactUrl = environment.contactUrl;
  constructor(private http: HttpClient, private toast: SwalService) {}

  postContact(f: any): Observable<any> {
    return this.http
      .post(this.ContactUrl, f)
      .pipe(catchError(this.handleError));
  }
  verify(data: any): Observable<any> {
    return this.http.post<any>(this.ContactUrl + '/verify', data)
      .pipe(catchError(this.handleError));
  }

  getContacts(): Observable<any> {
    return this.http
      .get<Contact[]>(this.ContactUrl)

      .pipe(catchError(this.handleError));
  }

  getContact(id: any): Observable<any> {
    return this.http
      .get<Contact>(`${this.ContactUrl}/${id}`)

      .pipe(catchError(this.handleError));
  }
  // HttpClient API put() method => Update employee
  updateContact(data: any) {
    const url = `${this.ContactUrl}/${data.update._id}`;

    return this.http
      .put<any>(url, data.update)
      .pipe(catchError(this.handleError));
  }
  // HttpClient API put() method => Update employee
  deleteContact(id: any): Observable<any> {
    return this.http
      .delete(`${this.ContactUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      window.confirm(errorMessage);
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      window.confirm(errorMessage);
    }

    return errorMessage;
  }
}
