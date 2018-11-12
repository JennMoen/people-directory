// people service for fetching data from API
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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

  public people: Person[];

  private url = 'https://demo.iofficeconnect.com/external/api/rest/v2/users';

  private imgQuery = '?selector=image(description,large,medium,name,original,small,smallSquare)';

  getPeople(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.url, httpOptions);
  }

  getPhotos(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.url + this.imgQuery, httpOptions);
  }

  findPerson(id): Observable<object> {
    return this.getPeople().pipe(map(data => data.filter(d => {
      return d.id === id;
      })
    ));
  }

  getPersonPhoto(id) {
    id.toString();
    return this.getPhotos().pipe(map(data => data.filter(d => {
      return d.id === id;
      })
    ));
  }

  // currently not in use--using findPerson above and it works fine
  getPerson(id) {
    id.toString();
    return this.http.get(this.url + `/${id}`, httpOptions);
  }

  // started refactoring here to try to create Person array in the service, not each individual component--not currently using this
  populateList() {
    return this.getPeople()
    .pipe(map(data => data.map(r => {
        return new Person(r.id, r.firstName, r.lastName, r.phone, r.knownAs, r.jobTitle, r.email, r.color);
      }))
    );
  }

  constructor(private http: HttpClient) { }
}
