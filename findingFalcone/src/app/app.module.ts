import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import * as fromContainers from '../app/results/containers/index';
import * as fromComponents from '../app/results/components/index';
import { allRoutes } from './routes';
@NgModule({
  declarations: [
    AppComponent,
    fromContainers.resultsContainer,
    fromComponents.components,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    RouterModule.forRoot(allRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
