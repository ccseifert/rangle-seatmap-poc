import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../person.model';
import { Map } from '../map.model';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements OnInit {
  @Input() person: Person;
  @Input() map: Map;
  @Input() imagePath: string;
  @Input() mapScale: number;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.map.personCardX = this.map.personCardX * this.mapScale;
    this.map.personCardY = this.map.personCardY * this.mapScale;
    this.map.personCardHeight = this.map.personCardHeight * this.mapScale;
    this.map.personCardWidth = this.map.personCardWidth * this.mapScale;
  }

  updateImage(event) {
    event.target.src = this.imagePath + 'generic_person.png';
  }

  closePerson() {
    this.notify.emit();
  }
}