import { Component } from '@angular/core';
import { ApiActions } from './actions/api.actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  photos: string[];

  // form control for search criteria
  searchFormCtrl: FormControl;

  @select('photos')
  private readonly photosSubscriber: Observable<string[]>;

  constructor(private apiActions: ApiActions) {
    this.searchFormCtrl = new FormControl();
    this.apiActions.getPhotos();
    this.photosSubscriber.subscribe(photos => this.photos = photos);
  }

  // Search photos
  searchPhotosByCriteria() {
    console.log('searchPhotosByCriteria = ', this.searchFormCtrl.value);
    this.apiActions.getPhotos(this.searchFormCtrl.value);
  }
}
