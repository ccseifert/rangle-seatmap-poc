import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';
import { Person } from '../person.model';
import { Seat } from '../seat.model';
import { Map } from '../map.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  peopleData: Person[];
  person: Person;
  seatData: Seat[];
  mapData: Map[];
  map: Map;
  mapFilename: string;
  imageUrl: string;
  imageScale = 0.785;
  imageWidth = 1000;
  imageHeight: number;
  mapScale: number;
  personX: number;
  personY: number;
  personHeight: number;
  personWidth: number;
  showPerson = false;
  imagePath = '/assets/img/';
  imageDefaultWidth = 100;

  constructor(private peopleService: PeopleService, private router: Router) {}

  ngOnInit() {
    // get map info from json file
    this.peopleService.getData().subscribe(data => {
      this.mapData = data['maps'];
      this.map = this.mapData.find(m => m.path === this.router.url);
      this.mapFilename = this.map.file;

      // set map image
      this.imageUrl = this.imagePath + this.mapFilename;

      // set dimensions based on map image width
      this.imageHeight = this.imageWidth * this.imageScale;
      this.mapScale = this.imageWidth / 1000;
    });

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
    this.showPerson = true;
  }

  closePerson() {
    this.showPerson = false;
  }
}
