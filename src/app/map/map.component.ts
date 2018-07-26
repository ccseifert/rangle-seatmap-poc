import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';
import { Person } from '../person.model';
import { Seat } from '../seat.model';
import { Map } from '../map.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { globals } from '../globals';
import { HttpParams } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  peopleData: Person[];
  person: Person;
  seatData: Seat[];
  mapData: Map[];
  map: Map;
  imageUrl: string;
  imageScale = 0.785;
  imageWidth = 1000;
  imageHeight: number;
  mapScale: number;
  showPerson = false;
  activePerson: Person;

  constructor(private peopleService: PeopleService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // get map info from json file
    this.peopleService.getData().subscribe(data => {
      this.mapData = data['maps'];
      this.peopleData = data['people'];

      // if there is a seat in the query string, set the person
      const paramsId = this.route.snapshot.queryParams.seat;
      if (paramsId) {
        this.setPerson(paramsId);
      }

      // get page name
      const urlTree = this.router.parseUrl(this.router.url);
      const page = urlTree.root.children['primary'].segments.map(it => it.path);

      // get correct map image based on page name
      this.map = this.mapData.find(m => m.path === '/' + page);
      const mapFilename = this.map.file;

      // get correct seat data for this map
      this.seatData = data['seats'].filter(seat => seat.floor === this.map.id);

      // set map image
      this.imageUrl = globals.imagePath + mapFilename;

      // set dimensions based on map image width
      this.imageHeight = this.imageWidth * this.imageScale;
      this.mapScale = this.imageWidth / 1000;
    });

    this.peopleService.getActivePerson().subscribe(data => {
      this.activePerson = data;
      if (this.activePerson) {
        this.showPerson = true;
      } else {
        this.showPerson = false;
      }
    });
  }

  getPerson(id: string) {
    return this.peopleData.find(person => person.id === id);
  }

  setPerson(id: string) {
    this.person = this.getPerson(id);
    this.peopleService.setActivePerson(this.person);
  }

  onNotify(id: string) {
    this.setPerson(id);
  }

  closePerson() {
    this.peopleService.setActivePerson(null);
  }
}
