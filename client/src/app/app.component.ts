import { Component } from '@angular/core';
import { ApiActions } from './actions/api.actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  photos: string[];

  @select('photos')
  private readonly photosSubscriber: Observable<string[]>;

  constructor(private apiActions: ApiActions) {
    this.apiActions.getPhotos('');

    this.photosSubscriber.subscribe(photos => this.photos = photos);
  }
}
