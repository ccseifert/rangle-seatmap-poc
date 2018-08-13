import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../types/person.model';

@Injectable()
export class DataService {
  private url = 'assets/json/seatmap.json';
  // activePerson: string;
  public activePerson = new BehaviorSubject<Person>(null);

  public constructor(private http: HttpClient) {}

  public getData() {
    return this.http.get(this.url);
  }

  public getActivePerson() {
    return this.activePerson;
  }

  public setActivePerson(person) {
    this.activePerson.next(person);
  }
}
