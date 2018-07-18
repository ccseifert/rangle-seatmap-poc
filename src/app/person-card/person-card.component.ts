import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { Person } from '../person.model';
import { Map } from '../map.model';
import { PeopleService } from '../people.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements OnInit, OnDestroy /*, OnChanges*/ {
  // @Input() person: Person;
  person: Person;
  // @Input() map: Map;
  @Input() mapScale: number;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(private peopleService: PeopleService) {}

  private _map = new BehaviorSubject<Map>(null);

  // change data to use getter and setter
  @Input()
  set map(value) {
    // set the latest value for _data BehaviorSubject
    this._map.next(value);
  }

  get map() {
    // get the latest value from _data BehaviorSubject
    return this._map.getValue();
  }

  ngOnInit() {
    // now we can subscribe to it, whenever input changes,
    // we will run our grouping logic
    this._map.subscribe(x => {
      this.map.personCardX = this.map.personCardX * this.mapScale;
      this.map.personCardY = this.map.personCardY * this.mapScale;
      this.map.personCardHeight = this.map.personCardHeight * this.mapScale;
      this.map.personCardWidth = this.map.personCardWidth * this.mapScale;
    });
    this.peopleService.getActivePerson().subscribe(data => {
      this.person = data;
    });
  }

  ngOnDestroy() {
    this._map.unsubscribe();
  }

  /*
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['map']) {
      this.map.personCardX = this.map.personCardX * this.mapScale;
      this.map.personCardY = this.map.personCardY * this.mapScale;
      this.map.personCardHeight = this.map.personCardHeight * this.mapScale;
      this.map.personCardWidth = this.map.personCardWidth * this.mapScale;

      this.peopleService.getActivePerson().subscribe(data => {
        this.person = data;
      });
    }
  }
*/
  closePerson() {
    this.notify.emit();
  }
}
