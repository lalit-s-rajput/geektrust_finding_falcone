import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsService } from '../../services/results.service';

import { ResultContainerComponent } from './result-container.component';
import { mockData } from '../../../../assets/mockData/mockData';
import { BehaviorSubject, of } from 'rxjs';
import { ResultPageComponent } from '../../components';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Planets, Vehicle } from 'src/app/core/interface/interface';
describe('ResultContainerComponent', () => {
  let component: ResultContainerComponent;
  let fixture: ComponentFixture<ResultContainerComponent>;
  let service: ResultsService;
  // let planetData = [];
  // let vehicleData = [];
  const resultServiceStub = jasmine.createSpyObj('ResultsService', [
    'getPlanets',
    'getVehicles',
    'findFalcon',
    'resetData',
    'isFindDisabled',
  ]);
  let planetData = resultServiceStub.getPlanets.and.returnValue(
    of(mockData.Planets)
  );
  let vehicleData = resultServiceStub.getVehicles.and.returnValue(
    of(mockData.vehicle)
  );
  resultServiceStub.isFindDisabled = new BehaviorSubject<boolean>(true);
  resultServiceStub.timeTakenObservable = new BehaviorSubject(0);
  resultServiceStub.vehicleObservable = new BehaviorSubject<Vehicle[]>([]);
  resultServiceStub.planetInitialData = new BehaviorSubject<Planets[]>([]);
  resultServiceStub.finalData = new BehaviorSubject<{}>({});
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ResultContainerComponent, ResultPageComponent],
      providers: [{ provide: ResultsService, useValue: resultServiceStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(ResultContainerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ResultsService);
    service.isFindDisabled.next(false);
    service.timeTakenObservable.next(25);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
