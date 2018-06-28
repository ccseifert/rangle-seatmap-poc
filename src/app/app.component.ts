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
  seatData: Seat[];
  imageUrl: string;
  imageScale = 0.785;
  markerRadius = 18;
  imageWidth = 1000;
  imageHeight: number;
  mapScale: number;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.imageUrl = '/assets/img/map6thFloor.jpg';
    this.imageHeight = this.imageWidth * this.imageScale;
    this.mapScale = this.imageWidth / 1000;

    // var image = new Image();
    // image.addEventListener('load', e => this.handleImageLoad(e));
    // image.src = this.imageUrl;
    // this.currentImageHeight = image.height;
    // this.currentImageWidth = image.width;

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

  // handleImageLoad(event): void {
  //   this.imageWidth = event.target.width;
  //   this.imageHeight = event.target.height;
  // }
}
