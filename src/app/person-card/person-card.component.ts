import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../person.model';
import { Map } from '../map.model';
import { globals } from '../globals';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements OnInit {
  // @Input() person: Person;
  person: Person;
  @Input() map: Map;
  @Input() mapScale: number;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.map.personCardX = this.map.personCardX * this.mapScale;
    this.map.personCardY = this.map.personCardY * this.mapScale;
    this.map.personCardHeight = this.map.personCardHeight * this.mapScale;
    this.map.personCardWidth = this.map.personCardWidth * this.mapScale;

    this.peopleService.getActivePerson().subscribe(data => {
      this.person = data;
    });
  }

  closePerson() {
    this.notify.emit();
  }
}
