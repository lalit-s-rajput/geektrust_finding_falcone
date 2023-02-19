import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import * as fromContainers from '../app/results/containers/index';
import * as fromComponents from '../app/results/components/index';
import {allRoutes} from './routes';
@NgModule({
  declarations: [
    AppComponent,
    fromContainers.resultsContainer,
    fromComponents.components,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(allRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
