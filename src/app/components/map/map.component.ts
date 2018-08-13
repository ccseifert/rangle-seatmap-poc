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
  private activePerson: Person;
  private imageHeight: number;
  private imageScale = 0.785;
  private imageUrl: string;
  private imageWidth = 1000;
  private map: Map;
  private mapData: Map[];
  private mapScale: number;
  private peopleData: Person[];
  private seatData: Seat[];
  private showPerson = false;

  private closePerson() {
    this.dataService.setActivePerson(null);
  }

  public constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private getPerson(id: string) {
    return this.peopleData.find(person => person.id === id);
  }

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

  private onNotify(id: string) {
    this.setPerson(id);
  }

  private setImageHeight() {
    // set dimensions based on map image width
    this.imageHeight = this.imageWidth * this.imageScale;
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
  private setMapScale() {
    this.mapScale = this.imageWidth / 1000;
  }
  private setPerson(id: string) {
    const person = this.getPerson(id);
    this.dataService.setActivePerson(person);
  }

  private setPersonFromParams() {
    // if there is a seat in the query string, set the person
    const paramsId = this.route.snapshot.queryParams.seat;
    if (paramsId) {
      this.setPerson(paramsId);
    }
  }
}
