import {NgModule} from '@angular/core';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { MainContainerComponent } from './layouts/main-container/main-container.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    NotFoundComponent,
    MainContainerComponent
  ],
  imports: [
    HttpClientModule,
  ],
  exports: [
    MainContainerComponent
  ]
})
export class CoreModule {}
