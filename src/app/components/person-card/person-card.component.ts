import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Person } from '../../types/person.model';
import { Map } from '../../types/map.model';
import { DataService } from '../../services/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements OnInit, OnDestroy {
  // @Input() person: Person;
  private person: Person;
  // @Input() map: Map;
  @Input() private mapScale: number;
  @Output() private notify: EventEmitter<string> = new EventEmitter<string>();

  public constructor(private dataService: DataService) {}

  private _map = new BehaviorSubject<Map>(null);

  // change data to use getter and setter
  @Input()
  private set map(value) {
    // set the latest value for _data BehaviorSubject
    this._map.next(value);
  }

  private get map() {
    // get the latest value from _data BehaviorSubject
    return this._map.getValue();
  }

  public ngOnInit() {
    // subscribe to map, whenever it changes,
    // we will run our map logic
    this._map.subscribe(x => {
      if (this.map) {
        this.map.personCardX = this.map.personCardX * this.mapScale;
        this.map.personCardY = this.map.personCardY * this.mapScale;
        this.map.personCardHeight = this.map.personCardHeight * this.mapScale;
        this.map.personCardWidth = this.map.personCardWidth * this.mapScale;
      }
    });
    this.dataService.getActivePerson().subscribe(data => {
      this.person = data;
    });
  }

  public ngOnDestroy() {
    this._map.unsubscribe();
  }

  private closePerson() {
    this.notify.emit();
  }
}
