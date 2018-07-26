import { Component, OnInit, Input } from '@angular/core';
import { PeopleService } from '../people.service';
import { Person } from '../person.model';
import { globals } from '../globals';
import { Router } from '../../../node_modules/@angular/router';
import { Map } from '../map.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  peopleData: Person[];
  map: Map;
  showSearch = false;
  imagePath = globals.imagePath;
  searchText: string;

  constructor(private peopleService: PeopleService, private router: Router) {}

  ngOnInit() {
    this.resetPeople();
  }

  // TODO: seems like this should go somewhere better / more abstract
  sortByName(a, b) {
    if (a.lastname < b.lastname) {
      return -1;
    } else if (a.lastname > b.lastname) {
      return 1;
    } else {
      if (a.firstname < b.firstname) {
        return -1;
      } else if (a.firstname > b.firstname) {
        return 1;
      }
      return 0;
    }
  }

  resetPeople() {
    // get people data
    // TODO: can this be consolidated with the same code in map.component.ts?
    // TODO: Lazy load people when browsing all?
    this.peopleService.getData().subscribe(data => {
      this.peopleData = data['people'].sort(this.sortByName);
      const mapData = data['maps'];
      const urlTree = this.router.parseUrl(this.router.url);
      const page = urlTree.root.children['primary'].segments.map(it => it.path);

      this.map = mapData.find(m => m.path === '/' + page);
    });
  }

  filterPeople() {
    this.searchText = this.searchText.toLowerCase();
    this.peopleService.getData().subscribe(data => {
      this.peopleData = data['people']
        .filter(person => {
          if (person.firstname.toLowerCase().includes(this.searchText)) {
            return true;
          }
          if (person.lastname.toLowerCase().includes(this.searchText)) {
            return true;
          }
        })
        .sort(this.sortByName);
    });
  }

  selectPerson(person: Person) {
    this.closeSearch();
    this.peopleService.getData().subscribe(data => {
      const seat = data['seats'].find(s => s.id === person.id);
      const floor = seat.floor;

      if (this.map.id !== floor) {
        this.router.navigate(['/' + floor + 'th-floor'], { queryParams: { seat: person.id } });
      } else {
        this.peopleService.setActivePerson(person);
      }
    });

    // navigate to different floor if person isn't on this floor
    // this.router.navigate([''], { queryParams: { seat: person.id } });
    // this.map.id;
  }

  closeSearch() {
    this.searchText = null;
    this.showSearch = false;
    this.resetPeople();
  }
}
