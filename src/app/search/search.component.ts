import { Component, OnInit, Input } from '@angular/core';
import { PeopleService } from '../people.service';
import { Person } from '../person.model';
import { globals } from '../globals';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  peopleData: Person[];
  showSearch = false;
  imagePath = globals.imagePath;
  searchText: string;

  constructor(private peopleService: PeopleService) {}

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
    this.peopleService.setActivePerson(person);
    this.closeSearch();
  }

  closeSearch() {
    this.searchText = null;
    this.showSearch = false;
    this.resetPeople();
  }
}
