import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';
import { Person } from './person.model';
import { Seat } from './seat.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  peopleData: Person[];
  person: Person;
  seatData: Seat[];
  imageUrl: string;
  imageScale = 0.785;
  markerRadius = 18;
  imageWidth = 1000;
  imageHeight: number;
  mapScale: number;
  showPerson = false;
  personX = 235;
  personY = 368;
  personHeight = 120;
  personWidth = 440;
  personImageUrl = '';
  personImagePath = '/assets/img/';
  imageDefaultWidth = 100;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    // set map image
    this.imageUrl = '/assets/img/map6thFloor.jpg';

    // set dimensions based on map image width
    this.imageHeight = this.imageWidth * this.imageScale;
    this.mapScale = this.imageWidth / 1000;
    this.personX = this.personX * this.mapScale;
    this.personY = this.personY * this.mapScale;
    this.personHeight = this.personHeight * this.mapScale;
    this.personWidth = this.personWidth * this.mapScale;

    // get people data
    this.peopleService.getData().subscribe(data => {
      this.peopleData = data['people'];
    });

    // get seat data
    this.peopleService.getData().subscribe(data => {
      this.seatData = data['seats'];
    });
  }

  getPerson(id: string) {
    return this.peopleData.find(person => person.id === id);
  }

  onNotify(id: string) {
    this.person = this.getPerson(id);

    this.personImageUrl =
      this.personImagePath +
      'people/' +
      this.person.email.replace('@rangle.io', '') +
      '.jpg';

    this.showPerson = true;
  }

  updateUrl() {
    this.personImageUrl = this.personImagePath + 'generic_person.png';
  }

  closePerson() {
    this.showPerson = false;
    this.person = null;
    this.personImageUrl = null;
  }
}
