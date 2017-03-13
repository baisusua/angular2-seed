import { MarketModule } from './market/market.module';
import { ListComponent } from './list.component';
export const LISTROUTER = [{
    path: '',
    children: [{
        path: '',
        component: ListComponent
    }, {
        path: 'market',
        loadChildren: './market#MarketModule'
    }]
}];