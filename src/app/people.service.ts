import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class PeopleService {
  url = 'assets/json/people.json';

  constructor(private http: Http) {}

  getData() {
    return this.http
      .get(this.url)
      .pipe(map((response: Response) => response.json()));
  }
}
