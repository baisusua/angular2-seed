import {
    Routes,
    RouterModule,
    PreloadAllModules
} from '@angular/router';

import {
    LoginComponent
} from '../pages/login';

import {
    ListComponent
} from '../pages/list';

import {
    FundComponent
} from '../pages/fund';

const ROUTES: Routes = [{
    path: 'login',
    component: LoginComponent
}, {
    path: 'list',
    component: ListComponent
}, {
    path: 'fund',
    component: FundComponent
},{
    path: '**',
    redirectTo: '/list',
    pathMatch: 'full'
}];

export const routing = RouterModule.forRoot(ROUTES);

// export const routing = RouterModule.forRoot(ROUTES, {
//     useHash: false,
//     preloadingStrategy: PreloadAllModules
// });