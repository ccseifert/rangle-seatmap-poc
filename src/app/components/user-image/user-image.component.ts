import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.css']
})
export class UserImageComponent implements OnInit {
  @Input() private image: string;
  private imagePath = environment.imagePath;

  public constructor() {}

  public ngOnInit() {}

  // replace 404 image with generic image
  private updateImage(event) {
    event.target.src = this.imagePath + 'generic_person.png';
  }
}
