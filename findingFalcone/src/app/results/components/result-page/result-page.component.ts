import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Planets, Vehicle } from 'src/app/core/interface/interface';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
})
export class ResultPageComponent implements OnInit, AfterViewInit {
  _planets: Planets[] = [];
  planetsLoop: Planets[] = [];
  disabledBooleanArray: number[] = [];
  _disabledBooleanArray: number[] = [];
  firstDestination: any = '';
  _vehicles: Vehicle[] = [];
  finalData = [];
  selectedDestinations = [];
  isMobileScreen = false;
  @ViewChild('mainDiv') mainDiv?: ElementRef<HTMLElement>;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileScreen =
      this.mainDiv!.nativeElement.clientWidth <= 400 ? true : false;
  }
  @ViewChild('firstInput', { static: false }) firstInput:
    | ElementRef
    | undefined;

  @Input() set planets(data: Planets[] | null) {
    if (data) {
      this._planets = data;
    }
  }
  @Input() set vehicle(data: Vehicle[] | null) {
    if (data) {
      this._vehicles = data;
      this.resultService.vehicleObservable.next([...this._vehicles]);
    }
  }
  constructor(
    private resultService: ResultsService,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.isMobileScreen =
      this.mainDiv!.nativeElement.clientWidth <= 400 ? true : false;
    this.changeDetector.detectChanges(); //overkill and expensive but better than settimeout!!
  }

  selectedFromList(indexObj: any) {
    if (!this.disabledBooleanArray.length) {
      this.disabledBooleanArray.push(indexObj.currentIndex);
    } else {
      this.disabledBooleanArray = this.disabledBooleanArray.filter((index) => {
        return index !== indexObj.prevIndex;
      });
      this.disabledBooleanArray.push(indexObj.currentIndex);
    }
    this._disabledBooleanArray = this.disabledBooleanArray;
  }

  findFalcon() {}

  selectedVehicle(item: Vehicle) {
    this.resultService.modifyVehicleObservable(item);
  }
}
