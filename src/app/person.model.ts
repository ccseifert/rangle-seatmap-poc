export class Person {
  public id: string;
  public name: string;
  public title: string;
  public email: string;
  public image: string;

  constructor(
    id: string,
    name: string,
    title: string,
    email: string,
    image: string
  ) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.email = email;
    this.image = image;
  }
}
