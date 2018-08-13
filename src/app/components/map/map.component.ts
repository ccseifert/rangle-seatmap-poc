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
  private peopleData: Person[];
  private seatData: Seat[];
  private mapData: Map[];
  private activePerson: Person;
  private map: Map;
  private imageUrl: string;
  private imageScale = 0.785;
  private imageWidth = 1000;
  private imageHeight: number;
  private mapScale: number;
  private showPerson = false;

  public constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
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

  private setPersonFromParams() {
    // if there is a seat in the query string, set the person
    const paramsId = this.route.snapshot.queryParams.seat;
    if (paramsId) {
      this.setPerson(paramsId);
    }
  }

  private setMap() {
    // get page name
    const urlTree = this.router.parseUrl(this.router.url);
    const page = urlTree.root.children['primary'].segments.map(it => it.path);

    // get correct map image based on page name
    this.map = this.mapData.find(m => m.path === '/' + page);
  }

  private setMapFile() {
    // set map image
    const mapFilename = this.map.file;
    this.imageUrl = environment.imagePath + mapFilename;
  }

  private setImageHeight() {
    // set dimensions based on map image width
    this.imageHeight = this.imageWidth * this.imageScale;
  }

  private setMapScale() {
    this.mapScale = this.imageWidth / 1000;
  }

  private getPerson(id: string) {
    return this.peopleData.find(person => person.id === id);
  }

  private setPerson(id: string) {
    const person = this.getPerson(id);
    this.dataService.setActivePerson(person);
  }

  private onNotify(id: string) {
    this.setPerson(id);
  }

  private closePerson() {
    this.dataService.setActivePerson(null);
  }
}
