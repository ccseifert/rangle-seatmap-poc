import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Person } from '../../types/person.model';
import { Seat } from '../../types/seat.model';
import { Map } from '../../types/map.model';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  peopleData: Person[];
  seatData: Seat[];
  mapData: Map[];
  activePerson: Person;
  map: Map;
  imageUrl: string;
  imageScale = 0.785;
  imageWidth = 1000;
  imageHeight: number;
  mapScale: number;
  showPerson = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // get map info from json file
    this.dataService.getData().subscribe(data => {
      this.mapData = data['maps'];
      this.peopleData = data['people'];
      this.seatData = data['seats'];

      this.setPersonFromParams();
      this.setMap();

      // get correct seat data for this map
      this.seatData = this.seatData.filter(seat => seat.floor === this.map.id);

      this.setMapFile();
      this.setImageHeight();
      this.setMapScale();
    });

    // get info about active person shown in person-card
    this.dataService.getActivePerson().subscribe(data => {
      this.activePerson = data;
      this.showPerson = false;
      if (this.activePerson) {
        this.showPerson = true;
      }
    });
  }

  setPersonFromParams() {
    // if there is a seat in the query string, set the person
    const paramsId = this.route.snapshot.queryParams.seat;
    if (paramsId) {
      this.setPerson(paramsId);
    }
  }

  setMap() {
    // get page name
    const urlTree = this.router.parseUrl(this.router.url);
    const page = urlTree.root.children['primary'].segments.map(it => it.path);

    // get correct map image based on page name
    this.map = this.mapData.find(m => m.path === '/' + page);
  }

  setMapFile() {
    // set map image
    const mapFilename = this.map.file;
    this.imageUrl = environment.imagePath + mapFilename;
  }

  setImageHeight() {
    // set dimensions based on map image width
    this.imageHeight = this.imageWidth * this.imageScale;
  }

  setMapScale() {
    this.mapScale = this.imageWidth / 1000;
  }

  getPerson(id: string) {
    return this.peopleData.find(person => person.id === id);
  }

  setPerson(id: string) {
    const person = this.getPerson(id);
    this.dataService.setActivePerson(person);
  }

  onNotify(id: string) {
    this.setPerson(id);
  }

  closePerson() {
    this.dataService.setActivePerson(null);
  }
}
