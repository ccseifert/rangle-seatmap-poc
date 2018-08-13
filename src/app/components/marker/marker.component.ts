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
  @Input() private seat: Seat;
  @Input() private person: Person;
  @Input() private mapScale: number;
  @Output() private notify: EventEmitter<string> = new EventEmitter<string>();
  private markerRadius = 18;
  private activePerson: Person;
  private markerActive = false;

  public constructor(private dataService: DataService) {}

  public ngOnInit() {
    this.dataService.getActivePerson().subscribe(data => {
      this.activePerson = data;
      if (this.activePerson && this.activePerson.id === this.person.id) {
        this.markerActive = true;
      } else {
        this.markerActive = false;
      }
    });
  }

  private onMouseEnter(id: string, e: MouseEvent) {
    this.notify.emit(id);
  }
}
