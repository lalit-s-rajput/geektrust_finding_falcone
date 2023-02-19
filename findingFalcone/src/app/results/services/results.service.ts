import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private PLANET_API = 'https://findfalcone.herokuapp.com/planets';
  private VEHICLE_API = 'https://findfalcone.herokuapp.com/vehicles';
  private GET_TOKEN = 'https://findfalcone.herokuapp.com/token';
  private FIND_FALCON = 'https://findfalcone.herokuapp.com/find';
  constructor(private httpService:HttpClient) { }

  getPlanets(){
    return this.httpService.get(this.PLANET_API);
  }

  getVehicles(){
    return this.httpService.get(this.VEHICLE_API);
  }

  findFalcon(){
    
  }
}
