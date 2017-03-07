import {
  platformBrowser
} from '@angular/platform-browser';

import {
  enableProdMode
} from '@angular/core';

import {
  AppModule
} from './app/app.module';

enableProdMode();
platformBrowser().bootstrapModule(AppModule);