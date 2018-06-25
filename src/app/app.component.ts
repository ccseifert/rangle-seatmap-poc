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
  imageUrl: string;
  origImageHeight: number;
  origImageWidth: number;

  constructor(private peopleService: PeopleService) {
    this.imageUrl = '/assets/img/map6thFloor.jpg';
    this.origImageHeight = 0;
    this.origImageWidth = 0;
  }

  ngOnInit() {
    var image = new Image();
    image.addEventListener('load', e => this.handleImageLoad(e));
    image.src = this.imageUrl;
    this.origImageHeight = image.height;
    this.origImageWidth = image.width;

    this.peopleService.getData().subscribe(data => {
      this.peopleData = data['people'];
      // console.log(JSON.stringify(this.peopleData));
    });
  }

  handleImageLoad(event): void {
    this.origImageWidth = event.target.width;
    this.origImageHeight = event.target.height;
  }
}
