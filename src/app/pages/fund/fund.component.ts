import {
    Component,
    OnInit
} from '@angular/core';

import {
    ActivatedRoute
} from '@angular/router';

@Component({
    selector: 'fund',
    styles: [``],
    templateUrl: './fund.component.html'
})
export class FundComponent implements OnInit {

    public localState: any;
    constructor(
        public route: ActivatedRoute
    ) {}

    public ngOnInit() {
        this.route
            .data
            .subscribe((data: any) => {
                // your resolved data from route
                this.localState = data.yourData;
            });
        console.log('hello `Fund` component');
    }
}