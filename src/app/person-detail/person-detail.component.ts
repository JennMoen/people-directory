import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  @Input() person: Person;
  photo: string;

  constructor(private route: ActivatedRoute, private location: Location, private peopleService: PeopleService) { }

  ngOnInit() {
    this.getPerson();
  }

  getPerson(): Person {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`person with of ${id} found`);
    this.peopleService.findPerson(id)
     .subscribe(person =>
    this.person = new Person(person[0].id,
    person[0].firstName, person[0].lastName, person[0].phone, person[0].knownAs, person[0].jobTitle, person[0].email, person[0].color));
    this.peopleService.getPersonPhoto(id)
    .subscribe(pic => {
      this.photo = 'https://demo.iofficeconnect.com' + pic[0].image.medium;
      console.log(pic);
      console.log(this.photo);
    });
    return this.person;
  }

  goBack(): void {
    this.location.back();
  }

}
