export class Person {
  public id: string;
  public firstname: string;
  public lastname: string;
  public title: string;
  public email: string;
  public image: string;

  constructor(
    id: string,
    firstname: string,
    lastname: string,
    title: string,
    email: string,
    image: string
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.title = title;
    this.email = email;
    this.image = image;
  }
}
