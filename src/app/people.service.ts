import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PeopleService {
  url = 'assets/json/seatmap.json';

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.url);
  }
}
