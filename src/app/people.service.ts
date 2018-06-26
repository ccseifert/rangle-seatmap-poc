import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PeopleService {
  url = 'assets/json/people.json';

  constructor(private http: HttpClient) {}

  getData() {
    return this.http
      .get(this.url)
      .pipe(map((response: Response) => response.json()));
  }
}
