import { Component, OnInit, Input } from '@angular/core';
import { globals } from '../globals';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.css']
})
export class UserImageComponent implements OnInit {
  @Input() image: string;
  imagePath = globals.imagePath;

  constructor() {}

  ngOnInit() {}

  updateImage(event) {
    event.target.src = this.imagePath + 'generic_person.png';
  }
}
