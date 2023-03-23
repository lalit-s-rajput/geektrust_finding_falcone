import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { mockData } from 'src/assets/mockData/mockData';
import { ResultsService } from '../../services/results.service';

import { FindResultComponent } from './find-result.component';

describe('FindResultComponent', () => {
  let component: FindResultComponent;
  let fixture: ComponentFixture<FindResultComponent>;
  let service: ResultsService;
  let resultServiceStub = jasmine.createSpyObj('ResultsService', ['resetData']);
  resultServiceStub.finalData = new BehaviorSubject<{}>(
    mockData.successResponse
  );
  // let mockSuccessData = resultServiceStub.finalData.and.returnValue(
  //   of(mockData.successResponse)
  // );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FindResultComponent],
      providers: [{ provide: ResultsService, useValue: resultServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(FindResultComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ResultsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call start again method on button click', () => {
    spyOn(component, 'startAgain').and.callThrough();
    let element = fixture.debugElement.query(By.css('.footer button'));
    expect(element).toBeTruthy();
    element.nativeElement.click();
    expect(component.startAgain).toHaveBeenCalled();
  });

  it('on failed response notFound view should been generated', () => {
    resultServiceStub.finalData.next(mockData.failureResponse);
    fixture.detectChanges();
    expect(component.isFound).toBeFalsy();
    let element = fixture.debugElement.query(By.css('.body h2'));
    expect(element).toBeTruthy();
    expect(element.nativeElement.innerHTML).toEqual(
      'Sorry,Queen Al is not found in given planet list. Please Start again!!'
    );
  });
});
