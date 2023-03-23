import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, take, throwError } from 'rxjs';
import { mockData } from 'src/assets/mockData/mockData';

import { ResultsService } from './results.service';

describe('ResultsService', () => {
  let service: ResultsService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let httpClientStub = jasmine.createSpyObj('HttpClient', ['get']);
  //let planetsData = httpClientStub.get.and.returnValue(of(mockData.Planets));
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: service, useValue: httpClientStub }],
    });
    httpClient = TestBed.get(HttpClient);
    service = TestBed.inject(ResultsService);
    //service.de
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get planets on getPlanets api call', () => {
    let data = service.getPlanets();
    const request = httpMock.expectOne(
      'https://findfalcone.herokuapp.com/planets'
    );
    request.flush([...mockData.Planets]);
    expect(data.value).toEqual(mockData.Planets);
  });

  it('should get vehicles on getvehicles api call', () => {
    let data = service.getVehicles();
    const request = httpMock.expectOne(
      'https://findfalcone.herokuapp.com/vehicles'
    );
    request.flush([...mockData.vehicle]);
    expect(data.value).toEqual(mockData.vehicle);
  });

  it('should get correct response on find falcon method', () => {
    spyOn(httpClient, 'post').and.returnValue(of(mockData.successResponse));
    let data = service.findFalcon();
    data.subscribe((item: any) => {
      expect(item).toEqual(mockData.successResponse);
    });
  });

  it('should get throw error on find falcon method', () => {
    let mockData = spyOn(httpClient, 'post').and.returnValue(
      throwError(new Error('error in response'))
    );
    let data = service.findFalcon();
    data.subscribe((item: any) => {
      expect(item).toEqual(new Error('error in response'));
    });
  });

  it('vehicle data should be modified on modifyVehicleObservable', () => {
    let mock = JSON.parse(JSON.stringify(mockData.vehicle)); //[...mockData.vehicle];
    service.vehicleObservable.next(
      JSON.parse(JSON.stringify(mockData.vehicle))
    );
    service.modifyVehicleObservable({
      previousItem: mock[0],
      currentItem: mock[1],
    });
    expect(service.vehicleObservable.value[0].total_no).toEqual(
      mockData.vehicle[0].total_no + 1
    );
    expect(service.vehicleObservable.value[1].total_no).toEqual(
      mockData.vehicle[1].total_no - 1
    );
  });
  it('should reset all data on resetData method call', () => {
    service.resetData();
    expect(service.timeTakenObservable.value).toEqual(0);
    expect(service.isFindDisabled.value).toEqual(true);
  });

  it('should remove data from state on removeFinalData method call', () => {
    //let stateData = service.getState();
    service.State = { ...mockData.finalData };
    service.removeFromFinalData(
      mockData.vehicle[0].name,
      mockData.Planets[0].name
    );
    expect(service.State.vehicle_names).not.toContain(mockData.vehicle[0].name);
  });
  it('addToFinalData method should work correctly', () => {
    /**
     * cannot test this correctly because dropdown options are disabled so sending data and testing
     * them is not accurate!
     */
    service.addToFinalData(
      { current: 'Space pod', prev: '' },
      { current: 'Donlon', prev: '' },
      false
    );
    expect(service.State.vehicle_names).toContain(mockData.vehicle[0].name);
    expect(service.State.planet_names).toContain(mockData.Planets[0].name);
    service.State = { ...mockData.finalData };
    service.addToFinalData(
      { current: 'Space pod', prev: '' },
      { current: 'Donlon', prev: '' },
      true
    );
    service.State = { ...mockData.resetData };
    service.State.planet_names.push('Jebing');
    service.State.planet_names.push('Lerbin');
    service.State.vehicle_names.push('Space pod');
    service.addToFinalData(
      { current: 'Space pod', prev: '' },
      { current: 'Pingasor', prev: 'Enchai' },
      false
    );
    expect(service.State.planet_names.length).toEqual(3);
  });
});
