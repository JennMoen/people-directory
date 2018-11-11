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

  getPeople() {
    return this.peopleService.getPeople()
    .subscribe(response => {
      this.people = response.map(r => {
        return new Person(r.id, r.firstName, r.lastName, r.phone, r.knownAs);
      });
    });
  }

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.getPeople();
  }

}
