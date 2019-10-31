import { Injectable } from '@angular/core';
import { Reducer, combineReducers } from 'redux';
import { APIAction } from '../actions/api.actions';
import { ActionTypes } from '../actions/action.types';

@Injectable()
export class Reducers {

  public readonly rootReducer: Reducer;

  constructor() {
    const photos = this.createPhotos();
    this.rootReducer = combineReducers
      (
        {
          photos
        }
      );
  }

  private createPhotos() {
    return (state: string[] = null, apiAction: APIAction): string[] => {
      switch (apiAction.type) {
        case ActionTypes.GET_PHOTOS_SUCCESS: {
          return apiAction.payload as string[];
        }
        default: {
          return state;
        }
      }
    };
  }
}
