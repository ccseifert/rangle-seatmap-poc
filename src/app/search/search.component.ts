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

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    // get people data - TODO: can this be consolidated with the same code in map.component.ts?
    this.peopleService.getData().subscribe(data => {
      this.peopleData = data['people'].sort(this.sortByName);
    });
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

  closeSearch() {
    this.showSearch = false;
  }
}
