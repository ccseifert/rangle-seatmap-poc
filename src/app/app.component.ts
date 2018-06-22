import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';
import { Person } from './person.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  peopleData: Person[];
  blah = '';

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.peopleService.getData().subscribe(data => {
      this.peopleData = data['people'];
      console.log(JSON.stringify(this.peopleData));
    });
  }
}
