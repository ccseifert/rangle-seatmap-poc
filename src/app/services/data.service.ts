import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../types/person.model';

@Injectable()
export class DataService {
  public activePerson = new BehaviorSubject<Person>(null);
  private url = 'assets/json/seatmap.json';

  public constructor(private http: HttpClient) {}

  public getActivePerson() {
    return this.activePerson;
  }

  public getData() {
    return this.http.get(this.url);
  }

  public setActivePerson(person) {
    this.activePerson.next(person);
  }
}
