import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Planets, Vehicle } from 'src/app/core/interface/interface';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
})
export class ResultPageComponent implements OnInit {
  _planets: Planets[] = [];
  planetsLoop: Planets[] = [];
  disabledBooleanArray: number[] = [];
  _disabledBooleanArray: number[] = [];
  firstDestination: any = '';
  _vehicles: Vehicle[] = [];
  finalData = [];
  selectedDestinations = [];
  @ViewChild('firstInput', { static: false }) firstInput:
    | ElementRef
    | undefined;

  @Input() set planets(data: Planets[] | null) {
    console.log(data);
    if (data) {
      this._planets = data;
      // this.planetsLoop = data;
    }
  }
  @Input() set vehicle(data: Vehicle[] | null) {
    console.log(data);
    if (data) {
      this._vehicles = data;
      this.resultService.vehicleObservable.next(this._vehicles);
    }
  }
  constructor(private resultService: ResultsService) {}
  ngOnInit(): void {}

  selectedFromList(indexObj: any) {
    console.log(indexObj);
    if (!this.disabledBooleanArray.length) {
      this.disabledBooleanArray.push(indexObj.currentIndex);
    } else {
      this.disabledBooleanArray = this.disabledBooleanArray.filter((index) => {
        return index !== indexObj.prevIndex;
      });
      this.disabledBooleanArray.push(indexObj.currentIndex);
    }
    console.log(this.disabledBooleanArray);
    this._disabledBooleanArray = this.disabledBooleanArray;
  }

  findFalcon() {}

  selectedVehicle(item: Vehicle) {
    this.resultService.modifyVehicleObservable(item);
  }
}
