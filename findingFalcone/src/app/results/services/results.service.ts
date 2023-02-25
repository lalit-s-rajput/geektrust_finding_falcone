import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Vehicle } from 'src/app/core/interface/interface';
@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  vehicleObservable = new BehaviorSubject<Vehicle[]>([]);
  private PLANET_API = 'https://findfalcone.herokuapp.com/planets';
  private VEHICLE_API = 'https://findfalcone.herokuapp.com/vehicles';
  private GET_TOKEN = 'https://findfalcone.herokuapp.com/token';
  private FIND_FALCON = 'https://findfalcone.herokuapp.com/find';
  constructor(private httpService: HttpClient) {}

  getPlanets() {
    return this.httpService.get(this.PLANET_API);
  }

  getVehicles() {
    return this.httpService.get(this.VEHICLE_API);
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
}
