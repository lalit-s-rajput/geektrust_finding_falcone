import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-find-result',
  templateUrl: './find-result.component.html',
  styleUrls: ['./find-result.component.scss'],
})
export class FindResultComponent implements OnInit {
  planet_name: string | null = '';
  timeTaken: number = 0;
  isFound = false;
  constructor(
    private routerService: Router,
    private resultService: ResultsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.resultService.finalData.subscribe((data: any) => {
      if (data.status === 'success') {
        this.isFound = true;
        this.planet_name = data.planet_name;
        this.timeTaken = this.resultService.timeTakenObservable.value;
      } else {
        this.isFound = false;
      }
    });
    //this.planet_name = this.route.snapshot.paramMap.get('planetName');
    //this.timeTaken = this.route.snapshot.paramMap.get('time');
  }
  startAgain() {
    this.routerService.navigate(['']);
    this.resultService.resetData();
  }
}
