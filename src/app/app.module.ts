import {
    NgModule,
    ApplicationRef
} from '@angular/core';

import {
    BrowserModule
} from '@angular/platform-browser';

import { HMR } from '../config/hmr';

import {
    AppComponent
} from './pages/index/index.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule extends HMR {
  constructor(public appRef: ApplicationRef) {
      super(appRef);
  }
}