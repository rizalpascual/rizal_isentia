import { FluxStandardAction } from 'flux-standard-action';
import { dispatch } from '@angular-redux/store';
import { ActionTypes } from './action.types';
import { Injectable } from '@angular/core';

type Payload = string | string[];

export type APIAction = FluxStandardAction<Payload>;

@Injectable()
export class ApiActions {

  @dispatch()
  getPhotos = (payload: Payload): APIAction => ({
    type: ActionTypes.GET_PHOTOS,
    payload
  })

  getPhotosSuccess = (payload: Payload): APIAction => ({
    type: ActionTypes.GET_PHOTOS_SUCCESS,
    payload
  })

  handleError = (payload: Payload): APIAction => ({
    type: ActionTypes.HANDLE_ERROR,
    payload
  })
}
