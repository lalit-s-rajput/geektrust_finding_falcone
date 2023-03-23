import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Vehicle } from 'src/app/core/interface/interface';
import { mockData } from 'src/assets/mockData/mockData';
import { ResultsService } from '../../services/results.service';
import { SingleDropdownViewComponent } from '../single-dropdown-view/single-dropdown-view.component';
import { ResultPageComponent } from './result-page.component';

describe('ResultPageComponent', () => {
  let component: ResultPageComponent;
  let fixture: ComponentFixture<ResultPageComponent>;
  let service: ResultsService;
  const resultServiceStub = jasmine.createSpyObj('ResultsService', [
    'modifyVehicleObservable',
  ]);
  resultServiceStub.vehicleObservable = new BehaviorSubject<Vehicle[]>([]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ResultPageComponent, SingleDropdownViewComponent],
      providers: [{ provide: ResultsService, useValue: resultServiceStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultPageComponent);
    component = fixture.componentInstance;
    component.planets = mockData.Planets;
    component.vehicle = mockData.vehicle;
    component.disabledBooleanArray = [1, 2, 3];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should modify vehicle observable on change of vehicle selection', () => {
    spyOn(component, 'selectedVehicle').and.callThrough();
    expect(component).toBeTruthy();
    let dropdown = fixture.debugElement.query(
      By.css('app-single-dropdown-view')
    );
    expect(dropdown).toBeTruthy();
    dropdown.triggerEventHandler('selectedVehicle', mockData.vehicle[0]);
    expect(component.selectedVehicle).toHaveBeenCalled();
    // will test this in service class test
    /**
    resultServiceStub.vehicleObservable.subscribe((data: any) => {
      expect(data).toEqual(mockData.vehicle[0]);
    });
    //expect(service.vehicleObservable.value).toEqual(mockData.vehicle[0]);
     */
  });

  it('should set mobile screen variable on window resize', () => {
    spyOn(component, 'onResize').and.callThrough();
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component.onResize).toHaveBeenCalled();
  });

  it('should call selectedFromList on trigger of output event selected', () => {
    spyOn(component, 'selectedFromList').and.callThrough();
    let element = fixture.debugElement.query(
      By.css('app-single-dropdown-view')
    );
    expect(element).toBeTruthy();
    element.triggerEventHandler('selected', 4);
    expect(component.selectedFromList).toHaveBeenCalled();
    component.disabledBooleanArray = [];
    element.triggerEventHandler('selected', 1);
    expect(component.disabledBooleanArray.length).toEqual(1);
  });
});
