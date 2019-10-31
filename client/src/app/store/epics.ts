import { Injectable, Inject } from '@angular/core';
import { Epic, combineEpics, ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { APP_SERVICE_TOKEN, IAppService } from '../service/app.service';
import { ApiActions, APIAction } from '../actions/api.actions';
import { ActionTypes } from '../actions/action.types';

@Injectable()
export class Epics {

  public readonly rootEpic: Epic;

  constructor(
    @Inject(APP_SERVICE_TOKEN) private appService: IAppService,
    private apiActions: ApiActions
  ) {
    this.rootEpic = combineEpics
      (
        this.createGetPhotosEpic()
      );
  }

  private createGetPhotosEpic() {
    return (action$, state$) => action$
      .pipe(
        ofType(ActionTypes.GET_PHOTOS),
        switchMap((action: APIAction) => {
          // Now call backend to search photos
          return this.appService.getPhotos(action.payload as string)
          .pipe(
            map(response => {
              return this.apiActions.getPhotosSuccess(response as string[]);
            }),
            catchError(err => {
              console.log('Error >>> ', err);
              return of(this.apiActions.handleError(err));
            })
          );
        })
      );
  }
}
