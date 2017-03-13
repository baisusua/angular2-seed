import {
    Component,
    OnInit
} from '@angular/core';

@Component({
    selector: 'list',
    styles: [``],
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
    public ngOnInit() {
        console.log('hello `List` component');
    }
}