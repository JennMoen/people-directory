export class Person {
  id: number;
  lastName: string;
  firstName: string;
  phone: string;
  knownAs: string;

  constructor(id, lastName, firstName, phone, knownAs) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.phone = phone;
    this.knownAs = knownAs;
  }
}
