import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() private notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  public constructor() {}

  public ngOnInit() {}

  public showSearch() {
    this.notify.emit(true);
  }
}
