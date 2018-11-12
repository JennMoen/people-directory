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
 testArr: Person[];

 backupImage: 'https://psychiatry.unm.edu/about/FacultyImages/Unknown-Male.jpg';

  getPeople() {
    return this.peopleService.getPeople()
    .subscribe(response => {
      // console.log(response);
      this.people = response.map(r => {
        return new Person(r.id, r.firstName, r.lastName, r.phone, r.knownAs, r.jobTitle, r.email, r.color);
      });
      this.getPhotos();
      // console.log(this.people);
    });
  }

  getPhotos() {
    return this.peopleService.getPhotos()
    .subscribe(response => {
      console.log(response);
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

  testMethod() {
    this.peopleService.populateList()
    .subscribe(ppl => this.testArr = ppl);
     console.log(this.testArr);
  }

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.getPeople();
    this.testMethod();
  }

}
