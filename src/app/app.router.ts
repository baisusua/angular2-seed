import {
    Routes,
    RouterModule,
    PreloadAllModules
} from '@angular/router';

import {
    LoginComponent
} from './pages/login';

import {
    FundComponent
} from './pages/fund';


export const ROUTES: Routes = [{
    path: 'login',
    component: LoginComponent
}, {
    path: 'list',
    loadChildren:'./pages/list#ListModule'
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
//     useHash: true,
//     preloadingStrategy: PreloadAllModules
// });