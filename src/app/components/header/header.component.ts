import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() private notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  public showSearch() {
    this.notify.emit(true);
  }
}
