import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-find-result',
  templateUrl: './find-result.component.html',
  styleUrls: ['./find-result.component.scss'],
})
export class FindResultComponent {
  constructor(
    private routerService: Router,
    private resultService: ResultsService
  ) {}
  startAgain() {
    this.routerService.navigate(['']);
    this.resultService.resetData();
  }
}
