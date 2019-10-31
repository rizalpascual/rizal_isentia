import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const APP_SERVICE_TOKEN = new InjectionToken<IAppService>('APP_SERVICE_TOKEN');

export interface IAppService {
  getPhotos(criteria: string): Observable<string[]>;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  getPhotos(criteria: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`http://localhost:3000/`)
    .pipe(
      map((body) => body)
    );
  }
}
