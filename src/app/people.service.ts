// people service for fetching data from API
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Person } from './person';
import { map } from 'rxjs/operators';

// obviously this is not a secure place for auth data--just getting the list of employees to properly return first!
const httpOptions = {
  headers: new HttpHeaders({
    'x-auth-username':  'jmoen',
    'x-auth-password': 'jobinterview2018'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private url = 'https://demo.iofficeconnect.com/external/api/rest/v2/users';

  private imgQuery = '?selector=image(description,large,medium,name,original,small,smallSquare)';

  getPeople(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.url, httpOptions);
  }

  getPhotos(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.url + this.imgQuery, httpOptions);
  }

  constructor(private http: HttpClient) { }
}
