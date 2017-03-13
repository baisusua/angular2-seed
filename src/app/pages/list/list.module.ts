import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LISTROUTER } from './list.router';
import { ListComponent } from './list.component';

console.log('`List` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(LISTROUTER),
  ],
})
export class ListModule {
  public static routes = LISTROUTER;
}
