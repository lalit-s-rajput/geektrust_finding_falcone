import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Vehicle } from 'src/app/core/interface/interface';
import { mockData } from 'src/assets/mockData/mockData';
import { ResultsService } from '../../services/results.service';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { SingleDropdownViewComponent } from './single-dropdown-view.component';

describe('SingleDropdownViewComponent', () => {
  let component: SingleDropdownViewComponent;
  let fixture: ComponentFixture<SingleDropdownViewComponent>;
  let service: ResultsService;
  let resultsServiceStub = jasmine.createSpyObj('ResultsService', [
    'addToFinalData',
  ]);
  resultsServiceStub.vehicleObservable = new BehaviorSubject<Vehicle[]>(
    mockData.vehicle
  );
  resultsServiceStub.timeTakenObservable = new BehaviorSubject(50);
  let changedData: any = resultsServiceStub.addToFinalData.and.returnValue();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [SingleDropdownViewComponent, RadioGroupComponent],
      providers: [{ provide: ResultsService, useValue: resultsServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleDropdownViewComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ResultsService);
    component.vehicle = mockData.vehicle;
    component.planets = mockData.Planets;
    component.selectedIndex = 0;
    //service.vehicleObservable.next(mockData.vehicle);
    component.disabledOption = [0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set-data function should called on input keyup event', () => {
    spyOn(component, 'setData').and.callThrough();
    let element = fixture.debugElement.query(
      By.css('.single-dropdown-container input')
    );
    expect(element).toBeTruthy();
    element.nativeElement.dispatchEvent(new Event('keyup'));
    expect(component.setData).toHaveBeenCalled();
    element.nativeElement.value = 'Je';
    element.nativeElement.dispatchEvent(new Event('keyup'));
    expect(component.planetsLoop.length).toEqual(1);
  });

  it('should dispatch document click event', () => {
    //document.dispatchEvent
    spyOn(component, 'clickOutside').and.callThrough();
    document.dispatchEvent(new Event('click'));
    expect(component.clickOutside).toHaveBeenCalled();
  });
  /**
  xit('should dispatch host click event', () => {
    spyOn(component, 'clickInside').and.callThrough();
    let element = fixture.debugElement.query(
      By.css('.single-dropdown-container')
    );
    expect(element).toBeTruthy();
    element.nativeElement.dispatchEvent(new Event('click'));
    expect(component.clickInside).toHaveBeenCalled();
  });
   */

  it('open dropdown field on click', () => {
    spyOn(component, 'openDropdownField').and.callThrough();
    let element = fixture.debugElement.query(By.css('.fa-caret-square-o-down'));
    expect(element).toBeTruthy();
    element.nativeElement.click();
    expect(component.openDropdownField).toHaveBeenCalled();
  });

  it('disable field event should return className isDisabled on field disable', () => {
    spyOn(component, 'disableField').and.callThrough();
    //component.disableField(0);
    expect(component.disableField(0)).toEqual('isDisabled');
  });

  it('should call selectedVehicleData on radio component output event', () => {
    spyOn(component, 'selectedVehicleData').and.callThrough();
    let dropElement = fixture.debugElement.query(
      By.css('.fa-caret-square-o-down')
    );
    expect(dropElement).toBeTruthy();
    dropElement.nativeElement.click();
    fixture.detectChanges();
    let element = fixture.debugElement.queryAll(By.css('.auto-field'))[1];
    expect(element).toBeTruthy();
    element.nativeElement.click();
    fixture.detectChanges();
    let radioElement = fixture.debugElement.query(By.css('app-radio-group'));
    expect(radioElement).toBeTruthy();
    radioElement.triggerEventHandler('selectedItem', {
      previousItem: mockData.vehicle[0],
      currentItem: mockData.vehicle[1],
    });
    expect(component.selectedVehicleData).toHaveBeenCalled();
    //fixture.detectChanges();
  });
});
