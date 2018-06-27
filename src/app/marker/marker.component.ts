import { Component, OnInit, Input } from '@angular/core';
import { Seat } from '../seat.model';
import { Person } from '../person.model';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css'],
})
export class MarkerComponent implements OnInit {
  @Input() seat: Seat;
  @Input() person: Person;
  @Input() mapScale: number;
  @Input() markerRadius: number;
  showPerson: string;
  showPersonX: number;
  showPersonY: number;

  constructor() {}

  ngOnInit() {}

  onMouseEnter(id: string, e: MouseEvent) {
    this.showPerson = id;
    this.showPersonX = e.clientX;
    this.showPersonY = e.clientY;
  }

  onMouseLeave() {
    this.showPerson = null;
    this.showPersonX = null;
    this.showPersonY = null;
  }
}
