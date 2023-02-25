import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-result-container',
  templateUrl: './result-container.component.html',
  styleUrls: ['./result-container.component.scss']
})
export class ResultContainerComponent implements OnInit {
  planetsData$:any;
  vehicleData$:any;
  constructor(private service:ResultsService){}
  ngOnInit(): void {
      this.planetsData$ = this.service.getPlanets();
      this.vehicleData$ = this.service.getVehicles();
  }
}
