import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { Vehicle } from 'src/app/core/interface/interface';
import { mockData } from 'src/assets/mockData/mockData';
import { ResultsService } from '../../services/results.service';

import { RadioGroupComponent } from './radio-group.component';

describe('RadioGroupComponent', () => {
  let component: RadioGroupComponent;
  let fixture: ComponentFixture<RadioGroupComponent>;
  let service: ResultsService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RadioGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioGroupComponent);
    component = fixture.componentInstance;
    component.vehicleData = mockData.vehicle;
    service = TestBed.inject(ResultsService);
    service.vehicleObservable = new BehaviorSubject<Vehicle[]>(
      mockData.vehicle
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call item selected on radio button click', () => {
    spyOn(component, 'itemSelected').and.callThrough();
    let element = fixture.debugElement.queryAll(By.css('.ship-info input'))[0];
    expect(element).toBeTruthy();
    element.nativeElement.checked = true;
    element.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.itemSelected).toHaveBeenCalled();
  });
});
