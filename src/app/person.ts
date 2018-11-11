export class Person {
  id: number;
  lastName: string;
  firstName: string;
  phone: string;
  knownAs: string;
  imgUrl: string;

  constructor(id, firstName, lastName, phone, knownAs) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.knownAs = knownAs;
  }
}
