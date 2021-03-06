import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Person } from '../person.model';
import { globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  peopleData: Person[];
  showSearch = false;
  imagePath = globals.imagePath;
  searchText: string;

  constructor(private dataService: DataService, private router: Router) {}

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

  // reset data
  resetPeople() {
    // get people data
    // TODO: Lazy load people when browsing all?
    this.dataService.getData().subscribe(data => {
      this.peopleData = data['people'].sort(this.sortByName);
    });
  }

  // filter browse list based on search criteria
  filterPeople() {
    this.searchText = this.searchText.toLowerCase();
    this.dataService.getData().subscribe(data => {
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

  // user clicks person in search box, sends them to the appropriate floor, opens their usercard
  selectPerson(person: Person) {
    this.closeSearch();
    this.dataService.getData().subscribe(data => {
      const seat = data['seats'].find(s => s.id === person.id);
      const floor = seat.floor;

      // TODO: can this be consolidated with the same code in map.component.ts?
      const urlTree = this.router.parseUrl(this.router.url);
      const page = urlTree.root.children['primary'].segments.map(it => it.path);
      const map = data['maps'].find(m => m.path === '/' + page);

      if (map.id !== floor) {
        this.router.navigate([floor + 'th-floor'], { queryParams: { seat: person.id } });
      } else {
        this.dataService.setActivePerson(person);
      }
    });
  }

  // close search box
  closeSearch() {
    this.searchText = null;
    this.showSearch = false;
    this.resetPeople();
  }
}
