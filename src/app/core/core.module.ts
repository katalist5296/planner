import {NgModule} from '@angular/core';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { MainContainerComponent } from './layouts/main-container/main-container.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    MainContainerComponent
  ],
  exports: [
    MainContainerComponent
  ]
})
export class CoreModule {}
