import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { finalState, Planets, Vehicle } from 'src/app/core/interface/interface';
@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private State:finalState = {
    "token":'',
    'planet_names':[],
    "vehicle_names":[]
  };
  finalData = new BehaviorSubject(this.State);
  vehicleObservable = new BehaviorSubject<Vehicle[]>([]);
  vehicleInitialData:any = [];
  copy = [];
  planetInitialData = new BehaviorSubject<Planets[]>([]);
  timeTakenObservable = new BehaviorSubject(0);
  private PLANET_API = 'https://findfalcone.herokuapp.com/planets';
  private VEHICLE_API = 'https://findfalcone.herokuapp.com/vehicles';
  private GET_TOKEN = 'https://findfalcone.herokuapp.com/token';
  private FIND_FALCON = 'https://findfalcone.herokuapp.com/find';
  constructor(private httpService: HttpClient) {}

  getPlanets() {
    this.httpService.get(this.PLANET_API).subscribe((data:any)=>{
      this.planetInitialData.next(data);
    });
    return this.planetInitialData;
  }

  getVehicles() {
    this.httpService.get(this.VEHICLE_API).subscribe((data:any)=>{
      this.vehicleInitialData = JSON.parse(JSON.stringify([...data]));
      this.vehicleObservable.next([...data]);
    });
    return this.vehicleObservable;
  }

  findFalcon() {}

  modifyVehicleObservable(item: any) {
    let isPrevModified = false;
    this.vehicleObservable.value.forEach((vehicle) => {
      if (
        item.currentItem.total_no !== 0 &&
        item.currentItem.name === vehicle.name
      ) {
        vehicle.total_no -= 1;
      }
      if(!isPrevModified && item.previousItem?.name === vehicle.name){
        vehicle.total_no++;
        isPrevModified = true;
      }
    });
  }

  resetVehicleData(){
    this.vehicleObservable.next(JSON.parse(JSON.stringify([...this.vehicleInitialData])));
  }

  timeTaken(data:any){

  }

  addToFinalData(Vehicle: { current: any; prev: any; },Planet: { current: any; prev: any; },flag:boolean){
    console.log('vehicle:',Vehicle);
    console.log('planet:',Planet.current);
    if(!this.State.planet_names.length || !this.State.vehicle_names.length){
      this.State.planet_names.push(Planet.current);
      this.State.vehicle_names.push(Vehicle.current);
      return;
    }
    if(flag){
      this.State.planet_names.push(Planet.current);
      this.State.vehicle_names.push(Vehicle.current);
      return;
    }
    if(Planet.prev!==Planet.current){
      this.State.planet_names = this.State.planet_names.filter((names)=>{
        return names!==Planet.prev;
      });
      this.State.planet_names.push(Planet.current);
    }
    if(Vehicle.current && Vehicle.prev!==Vehicle.current){
      this.State.vehicle_names = this.State.vehicle_names.filter((names)=>{
        return names!==Vehicle.prev;
      });
      this.State.vehicle_names.push(Vehicle.current);
    }
    console.log(this.State);
  }

  removeFromFinalData(vehicle:string|null,planet:string|null){
    if(vehicle){
      this.State.vehicle_names = this.State.vehicle_names.filter((name)=>{
        return name!==vehicle;
      });
    }
    if(planet){
      this.State.planet_names = this.State.planet_names.filter((name)=>{
        return name!==planet;
      });
    }
  }
}
