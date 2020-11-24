export class Employee {
  public firstName: string;
  public lastName: string;
  public dateOfBirth: string;
  public speciality: string;

  constructor(firstName: string, lastName: string, dateOfBirth: string, speciality: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.speciality = speciality;
  }
}
