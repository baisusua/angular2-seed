import {
    Routes
} from '@angular/router';

import {
    ListComponent
} from '../pages/list';

import {
    FundComponent
} from '../pages/fund';

export const ROUTES: Routes = [{
        path: 'list',
        component: ListComponent
    },{
        path: 'fund',
        component: FundComponent
    }
];