import {
    NgModule,
    ApplicationRef
} from '@angular/core';

import {
    FormsModule
} from '@angular/forms';

import {
    HttpModule
} from '@angular/http';

import {
    BrowserModule
} from '@angular/platform-browser';

import {
    RouterModule,
    PreloadAllModules
} from '@angular/router';

import {
    HMR
} from '../config/hmr';

import {
    routing
} from './app.router';

import {
    AppComponent
} from './pages/index/index.component';

import {
    LoginComponent
} from './pages/login'

import {
    FundComponent
} from './pages/fund'

import '../assets/css/common.css';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        FundComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule extends HMR {
    constructor(public appRef: ApplicationRef) {
        super(appRef);
    }
}