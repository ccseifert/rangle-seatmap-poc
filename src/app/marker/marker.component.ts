import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  markerRadius = 18;

  constructor() {}

  ngOnInit() {}

  onMouseEnter(id: string, e: MouseEvent) {
    this.notify.emit(id);
  }
}
