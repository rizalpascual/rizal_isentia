import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule, MatToolbarModule, MatGridListModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { createEpicMiddleware } from 'redux-observable';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppState } from './store/app-state';
import { ApiActions } from './actions/api.actions';
import { APP_SERVICE_TOKEN, AppService } from './service/app.service';
import { Epics } from './store/epics';
import { Reducers } from './store/reducers';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    NgReduxModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiActions,
    Epics,
    Reducers,
    { provide: APP_SERVICE_TOKEN, useClass: AppService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(store: NgRedux<AppState>, reducers: Reducers, epics: Epics) {
    const rootEpicMiddleWare = createEpicMiddleware();
    store.configureStore(
      reducers.rootReducer,
      {
      } as AppState,
      [
        rootEpicMiddleWare
      ]
    );
    rootEpicMiddleWare.run(epics.rootEpic);
  }
}
