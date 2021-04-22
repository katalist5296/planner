import {NgModule} from '@angular/core';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { MainContainerComponent } from './layouts/main-container/main-container.component';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import {RouterModule} from '@angular/router';
import { TitlebarComponent } from './components/titlebar/titlebar.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    MainContainerComponent,
    NavigationComponent,
    TitlebarComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    MainContainerComponent
  ]
})
export class CoreModule {}
