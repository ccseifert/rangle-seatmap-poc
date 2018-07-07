import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  Renderer
} from '@angular/core';
import { Seat } from '../seat.model';
import { Person } from '../person.model';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit {
  @Input() seat: Seat;
  @Input() person: Person;
  @Input() mapScale: number;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  markerRadius = 18;
  activePerson: Person;
  markerActive = false;

  constructor(private render: Renderer, private peopleService: PeopleService) {}

  ngOnInit() {
    this.peopleService.getActivePerson().subscribe(data => {
      this.activePerson = data;
      if (this.activePerson && this.activePerson.id === this.person.id) {
        this.markerActive = true;
        // this.render.setElementClass(e.target, 'active', true);
      } else {
        this.markerActive = false;
        // this.render.setElementClass(e.target, 'active', false);
      }
    });
  }

  onMouseEnter(id: string, e: MouseEvent) {
    this.notify.emit(id);
  }

  // onMouseLeave(e: MouseEvent) {
  //   this.render.setElementClass(e.target, 'active', false);
  // }
}
