import { Route } from '@angular/router';
import * as fromContainers from '../app/results/containers/index';
import { AppComponent } from './app.component';

export const allRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: fromContainers.ResultContainerComponent,
      },
      {
        path: 'find',
        component: fromContainers.FindResultComponent,
      },
    ],
  },
];
