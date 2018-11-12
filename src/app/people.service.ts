// people service for fetching data from API
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Person } from './person';
import { map } from 'rxjs/operators';

// obviously this is not a secure place for auth data--would move elsewhere for production
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

  private imgQuery = 'selector=image(description,large,medium,name,original,small,smallSquare)';

  //  just returns first 50 db entries--basic call--this can eventually
  //  be deleted because the loadNext function can be used with an argument of 0
  getPeople(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.url, httpOptions);
  }

  // grabs photo urls for selected list of people
  getPhotos(n: number): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.url + `?startAt=${n}&` + this.imgQuery, httpOptions);
  }

  // linked to pagination to load next group of 50 people
  loadNext(n: number) {
    return this.http.get<Array<any>>(this.url + `?startAt=${n}`, httpOptions);
  }

  // this method worked at first but not after pagination was inserted--will
  // get replaced with the getPerson method below since it just grabs user by id
  findPerson(id) {
    return this.getPeople().pipe(map(data => data.filter(d => {
      return d.id === id;
      })
    ));
  }

  // should be good for replacing findPerson above
  getPerson(id) {
    id.toString();
    return this.http.get(this.url + `/${id}`, httpOptions);
  }

  // calls url with photo selector query for person's details page
  getPersonPhoto(id) {
    id.toString();
    return this.http.get(this.url + `/${id}?` + this.imgQuery , httpOptions);
  }

  // makes call with orderBy paramater
  sort(criteria: string) {
    return this.http.get<Array<any>>(this.url + `?orderBy=${criteria}`, httpOptions);
  }

  // I know this is possibly redundant so it could be simplified since I already have both a sort and a load method
  sortAndLoad(criteria: string, starts: number) {
    return this.http.get<Array<any>>(this.url + `?orderBy=${criteria}&startAt=${starts}`, httpOptions);
  }

  // again, I know i probably could have found a better way for this than writing another method
  sortedPhotos(criteria: string, starts: number) {
    return this.http.get<Array<any>>(this.url + `?orderBy=${criteria}&startAt=${starts}&` + this.imgQuery, httpOptions);
  }

  // NOTE: started refactoring here to try to create Person array in the service, not each individual component--not currently using this
  populateList() {
    return this.getPeople()
    .pipe(map(data => data.map(r => {
        return new Person(r.id, r.firstName, r.lastName, r.phone, r.knownAs, r.jobTitle, r.email, r.color);
      }))
    );
  }

  constructor(private http: HttpClient) { }
}
