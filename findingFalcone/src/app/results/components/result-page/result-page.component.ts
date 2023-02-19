import { Component, Input, OnInit } from '@angular/core';
import { Planets, Vehicle } from 'src/app/core/interface/interface';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit{
  _planets:Planets[] = [];
  planetsLoop:Planets[] = [];
  _vehicles:Vehicle[] = [];
  finalData = [];
  selectedDestinations = [];

  @Input() set planets(data:Planets[] | null){
    console.log(data);
    if(data){
      this._planets = data;
      this.planetsLoop = data;
    }
  }
  @Input() set vehicle(data:Vehicle[] | null){
    console.log(data);
    if(data){
      this._vehicles = data;
    }
  }

  ngOnInit(): void {
      
  }

  selectFirst(target:any){
    let value = target.value;
    if(value){
      this.planetsLoop = this._planets.filter((data)=>{
        return value!==data.name;
      });
    } else {
      this.planetsLoop = this._planets;
    }
  }

  selectSecond(target:any){
    let value = target.value;
    if(value){
      this.planetsLoop = this.planetsLoop.filter((data)=>{
        return value!==data.name;
      });
    } else {
      this.planetsLoop = this._planets;
    }
  }
}
