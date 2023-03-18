import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, mergeMap, of, throwError } from 'rxjs';
import { finalState, Planets, Vehicle } from 'src/app/core/interface/interface';
@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private State: finalState = {
    token: '',
    planet_names: [],
    vehicle_names: [],
  };
  vehicleObservable = new BehaviorSubject<Vehicle[]>([]);
  vehicleInitialData: any = [];
  planetInitialData = new BehaviorSubject<Planets[]>([]);
  timeTakenObservable = new BehaviorSubject(0);
  isFindDisabled = new BehaviorSubject<boolean>(true);
  finalData = new BehaviorSubject<{}>({});
  private PLANET_API = 'https://findfalcone.herokuapp.com/planets';
  private VEHICLE_API = 'https://findfalcone.herokuapp.com/vehicles';
  private GET_TOKEN = 'https://findfalcone.herokuapp.com/token';
  private FIND_FALCON = 'https://findfalcone.herokuapp.com/find';
  constructor(private httpService: HttpClient) {}

  getPlanets() {
    this.httpService.get(this.PLANET_API).subscribe((data: any) => {
      this.planetInitialData.next(data);
    });
    return this.planetInitialData;
  }

  getVehicles() {
    this.httpService.get(this.VEHICLE_API).subscribe((data: any) => {
      this.vehicleInitialData = JSON.parse(JSON.stringify([...data]));
      this.vehicleObservable.next([...data]);
    });
    return this.vehicleObservable;
  }

  findFalcon() {
    const headers = { Accept: 'application/json' };
    return this.httpService.post(this.GET_TOKEN, {}, { headers }).pipe(
      mergeMap((data: any) => {
        return of(data);
        //return this.State;
      }),
      mergeMap((data: any) => {
        this.State.token = data.token;
        let headers = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        };
        return this.httpService.post(this.FIND_FALCON, this.State, {
          headers,
        });
      }),
      catchError((e: any) => {
        //do your processing here
        return throwError(() => new Error('error in response'));
      })
    );
  }

  modifyVehicleObservable(item: any) {
    let isPrevModified = false;
    this.vehicleObservable.value.forEach((vehicle) => {
      if (
        item.currentItem.total_no !== 0 &&
        item.currentItem.name === vehicle.name
      ) {
        vehicle.total_no -= 1;
      }
      if (!isPrevModified && item.previousItem?.name === vehicle.name) {
        vehicle.total_no++;
        isPrevModified = true;
      }
    });
  }

  resetVehicleData() {
    this.vehicleObservable.next(
      JSON.parse(JSON.stringify([...this.vehicleInitialData]))
    );
  }

  resetPlanetData() {}

  addToFinalData(
    Vehicle: { current: any; prev: any },
    Planet: { current: any; prev: any },
    flag: boolean
  ) {
    if (!this.State.planet_names.length || !this.State.vehicle_names.length) {
      this.State.planet_names.push(Planet.current);
      this.State.vehicle_names.push(Vehicle.current);
      if (
        this.State.planet_names.length == 4 &&
        this.State.vehicle_names.length == 4
      ) {
        this.isFindDisabled.next(false);
      }
      return;
    }
    if (flag) {
      this.State.planet_names.push(Planet.current);
      this.State.vehicle_names.push(Vehicle.current);
      if (
        this.State.planet_names.length == 4 &&
        this.State.vehicle_names.length == 4
      ) {
        this.isFindDisabled.next(false);
      }
      return;
    }
    if (Planet.prev !== Planet.current) {
      if (this.State.planet_names.length > 1) {
        let isFound = false;
        let arr = [];
        for (let i = 0; i < this.State.planet_names.length; i++) {
          if (!isFound && this.State.planet_names[i] == Planet.prev) {
            isFound = true;
            continue;
          }
          arr.push(this.State.planet_names[i]);
        }
        arr.push(Planet.current);
        this.State.planet_names = [...arr];
      } else {
        this.State.planet_names[0] = Planet.current;
      }
    }
    if (Vehicle.current && Vehicle.prev !== Vehicle.current) {
      if (this.State.vehicle_names.length > 1) {
        let isFound = false;
        let arr = [];
        for (let i = 0; i < this.State.vehicle_names.length; i++) {
          if (!isFound && this.State.vehicle_names[i] == Vehicle.prev) {
            isFound = true;
            continue;
          }
          arr.push(this.State.vehicle_names[i]);
        }
        arr.push(Vehicle.current);
        this.State.vehicle_names = [...arr];
      } else {
        this.State.vehicle_names[0] = Vehicle.current;
      }
    }
    if (
      this.State.planet_names.length == 4 &&
      this.State.vehicle_names.length == 4
    ) {
      this.isFindDisabled.next(false);
    }
  }

  removeFromFinalData(vehicle: string | null, planet: string | null) {
    if (vehicle) {
      this.State.vehicle_names = this.State.vehicle_names.filter((name) => {
        return name !== vehicle;
      });
    }
    if (planet) {
      this.State.planet_names = this.State.planet_names.filter((name) => {
        return name !== planet;
      });
    }
  }

  resetData() {
    this.isFindDisabled.next(true);
    this.timeTakenObservable.next(0);
    this.State.planet_names = [];
    this.State.vehicle_names = [];
    this.resetVehicleData();
    this.resetPlanetData();
  }
}
