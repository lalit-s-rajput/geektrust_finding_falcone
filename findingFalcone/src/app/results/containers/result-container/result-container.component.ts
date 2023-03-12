import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-result-container',
  templateUrl: './result-container.component.html',
  styleUrls: ['./result-container.component.scss'],
})
export class ResultContainerComponent implements OnInit {
  planetsData$: any;
  vehicleData$: any;
  time = 0;
  isDisabled = true;
  constructor(private service: ResultsService, private routeService: Router) {}
  ngOnInit(): void {
    this.service.resetData();
    this.planetsData$ = this.service.getPlanets();
    this.vehicleData$ = this.service.getVehicles();
    this.service.timeTakenObservable.subscribe((data) => {
      this.time = data;
    });
    this.service.isFindDisabled.subscribe((data: boolean) => {
      this.isDisabled = data;
    });
  }
  buttonStatus() {
    return this.service.isFindDisabled;
  }

  findFalcon() {
    this.routeService.navigate(['find']);
    this.service.findFalcon();
  }
}
