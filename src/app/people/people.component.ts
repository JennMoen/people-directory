import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

 people: Person[];
 selectedCriteria: string;
 loadRange = 0;

 backupImage: 'https://psychiatry.unm.edu/about/FacultyImages/Unknown-Male.jpg';

    // this just does a basic call to return the first 50 db entries and gets their photos
  getPeople() {
    return this.peopleService.loadNext(0)
    .subscribe(response => {
      this.people = response.map(r => {
        return new Person(r.id, r.firstName, r.lastName, r.phone, r.knownAs, r.jobTitle, r.email, r.color);
      });
      this.getPhotos(0);
    });
  }

  // calls for photo urls and matches them up to whatever list of people is loaded
  getPhotos(num: number) {
    return this.peopleService.getPhotos(num)
    .subscribe(response => {
      this.people.forEach(p => {
        response.forEach(r => {
          if ( p.id === r.id ) {
            if (r.image !== undefined) {
            p.imgUrl = 'https://demo.iofficeconnect.com' + r.image.smallSquare;
            }
          }
        });
      });
    });
  }

  //  the above method was working great until I added sort functionality!
  // I'll need to probably combine these two methods somehow as a next step
  sortedPhotos(criteria, num) {
    return this.peopleService.sortedPhotos(criteria, num)
    .subscribe(response => {
      this.people.forEach(p => {
        response.forEach(r => {
          if ( p.id === r.id ) {
            if (r.image !== undefined) {
            p.imgUrl = 'https://demo.iofficeconnect.com' + r.image.smallSquare;
            }
          }
        });
      });
    });
  }

  // allows user to page through employees--it also accounts for whether or not they've selected a criteria to search by prior to paging
  loadNext(n: number, event) {
    this.loadRange = n;
    console.log(this.selectedCriteria);
    if (this.selectedCriteria !== undefined) {
      this.peopleService.sortAndLoad(this.selectedCriteria, n)
      .subscribe(response => {
        this.people = response.map(r => {
        return new Person(r.id, r.firstName, r.lastName, r.phone, r.knownAs, r.jobTitle, r.email, r.color);
        });
      this.sortedPhotos(this.selectedCriteria, n);
      });
    } else {
    // const amount = event.path[0].innerHTML;
    return this.peopleService.loadNext(n)
    .subscribe(response => {
      this.people = response.map(r => {
      return new Person(r.id, r.firstName, r.lastName, r.phone, r.knownAs, r.jobTitle, r.email, r.color);
      });
    this.getPhotos(n);
    });
    }
  }

  // basic sorting function for criteria user chooses to sort by
  // changing the sort will throw it back to page 1
  sort(param: string) {
    this.selectedCriteria = param;
    return this.peopleService.sort(param)
    .subscribe(response => {
      this.people = response.map(r => {
      return new Person(r.id, r.firstName, r.lastName, r.phone, r.knownAs, r.jobTitle, r.email, r.color);
      });
      this.sortedPhotos(param, 0);
    });
  }

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.getPeople();
  }

}
