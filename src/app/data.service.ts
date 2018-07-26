import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Person } from './person.model';

@Injectable()
export class DataService {
  url = 'assets/json/seatmap.json';
  // activePerson: string;
  public activePerson = new BehaviorSubject<Person>(null);

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.url);
  }

  getActivePerson() {
    return this.activePerson;
  }

  setActivePerson(person) {
    this.activePerson.next(person);
  }
}
