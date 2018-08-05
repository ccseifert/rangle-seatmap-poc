import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  Renderer
} from '@angular/core';
import { Seat } from '../../types/seat.model';
import { Person } from '../../types/person.model';
import { DataService } from '../../services/data.service';

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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getActivePerson().subscribe(data => {
      this.activePerson = data;
      if (this.activePerson && this.activePerson.id === this.person.id) {
        this.markerActive = true;
      } else {
        this.markerActive = false;
      }
    });
  }

  onMouseEnter(id: string, e: MouseEvent) {
    this.notify.emit(id);
  }
}
