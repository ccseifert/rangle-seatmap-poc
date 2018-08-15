import { Component, ViewChild } from '@angular/core';
import { SearchComponent } from './components/search/search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(SearchComponent) private search: SearchComponent;

  private onNotify() {
    this.search.showSearch = true;
  }
}
