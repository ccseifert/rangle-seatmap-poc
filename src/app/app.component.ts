import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchComponent } from './components/search/search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(SearchComponent) search: SearchComponent;

  constructor() {}

  ngOnInit() {}

  onNotify() {
    this.search.showSearch = true;
  }
}
