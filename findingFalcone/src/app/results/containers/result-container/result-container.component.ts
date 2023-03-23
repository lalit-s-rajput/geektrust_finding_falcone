import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ResultsService } from '../../services/results.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  constructor(
    private service: ResultsService,
    private routeService: Router,
    private spinner: NgxSpinnerService
  ) {}
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

  findFalcon() {
    this.spinner.show();
    this.service.findFalcon().subscribe({
      next: (data: any) => {
        this.spinner.hide();
        if (data?.status) {
          this.service.finalData.next({ ...data });
          this.routeService.navigate(['find']);
        }
      },
      error: (e: any) => {
        this.spinner.hide();
        console.error(e);
      },
    });
  }
}
