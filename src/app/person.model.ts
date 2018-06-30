export class Person {
  public id: string;
  public name: string;
  public title: string;
  public email: string;

  constructor(id: string, name: string, title: string, email: string) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.email = email;
  }
}
