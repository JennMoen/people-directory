export class Person {
  id: number;
  lastName: string;
  firstName: string;
  phone: string;
  knownAs: string;
  imgUrl: string;
  jobTitle: string;
  email: string;
  color: string;

  constructor(id, firstName, lastName, phone, knownAs, jobTitle, email, color) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.knownAs = knownAs;
    this.jobTitle = jobTitle;
    this.color = color;
  }
}
