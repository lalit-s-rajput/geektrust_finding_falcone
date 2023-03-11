import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  HostListener,
} from '@angular/core';
import { Planets, Vehicle } from 'src/app/core/interface/interface';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-single-dropdown-view',
  templateUrl: './single-dropdown-view.component.html',
  styleUrls: ['./single-dropdown-view.component.scss'],
})
export class SingleDropdownViewComponent implements OnInit {
  _planets: Planets[] = [];
  planetsLoop: Planets[] = [];
  disabledBooleanArray = [false, false, false, false, false, false];
  prevSelectedDestination: any = '';
  firstDestination: any = '';
  prevSelectedVehicle: any = null;
  selectedIndex = undefined;
  _vehicles: Vehicle[] = [];
  finalData = [];
  selectedDestinations = [];
  wasInside = false;
  isDropFieldOpen = true;
  isFirstTime = true;
  @HostListener('click')
  clickInside() {
    this.wasInside = true;
  }
  @HostListener('document:click')
  clickOutside() {
    if (!this.wasInside) {
      this.planetsLoop = [];
      // this.isDropFieldOpen = false;
    }
    this.wasInside = false;
  }
  @ViewChild('firstInput', { static: false }) firstInput:
    | ElementRef
    | undefined;

  @ViewChildren('planetsOptions', { read: ElementRef }) planetsOptions:
    | QueryList<ElementRef>
    | undefined;
  @Input() set planets(data: Planets[] | null) {
    if (data) {
      this._planets = data;
      // this.planetsLoop = data;
    }
  }
  @Input() set vehicle(data: Vehicle[] | null) {
    if (data) {
      this._vehicles = data;
    }
  }
  @Input() set disabledOption(disableOptions: number[]) {
    if (disableOptions) {
      this.disabledBooleanArray.forEach((element, index) => {
        this.disabledBooleanArray[index] = false;
      });
      disableOptions.forEach((element: number) => {
        this.disabledBooleanArray[element] = true;
      });
    }
  }
  @Output() selected = new EventEmitter();
  @Output() selectedVehicle = new EventEmitter();
  @Output() selectedDestination = new EventEmitter();
  constructor(private service: ResultsService) {}
  ngOnInit(): void {}
  setData(target: any) {
    let value = target.value.toLowerCase();
    if (value) {
      this.planetsLoop = this._planets.filter((data) => {
        return data.name.toLowerCase().includes(value);
      });
    } else {
      this.planetsLoop = this._planets;
    }
  }

  firstSelection(index: any, item: any) {
    if (
      this.planetsOptions
        ?.toArray()
        [index].nativeElement.classList.contains('isDisabled')
    ) {
      this.planetsLoop = [];
      return;
    }
    this.selected.emit({
      currentIndex: index,
      prevIndex: this.selectedIndex !== undefined ? this.selectedIndex : index,
    });
    if (this.selectedIndex === undefined) {
      this.selectedIndex = index;
      this.disabledBooleanArray[index] = !this.disabledBooleanArray[index];
    } else if (this.selectedIndex === index) {
      //this.disabledBooleanArray[index] = !this.disabledBooleanArray[index];
    } else {
      this.disabledBooleanArray[this.selectedIndex] =
        !this.disabledBooleanArray[this.selectedIndex];
      this.selectedIndex = index;
      this.disabledBooleanArray[index] = !this.disabledBooleanArray[index];
    }
    this.prevSelectedDestination = this.firstDestination
      ? this.firstDestination.name
      : null;
    this.firstDestination = item;
    this.planetsLoop = [];
    this.isDropFieldOpen = false;
    // this.service.removeFromFinalData(
    //   this.prevSelectedVehicle ? this.prevSelectedVehicle.currentItem.name : null,
    //   this.prevSelectedDestination ? this.prevSelectedDestination : null
    // );
  }
  openDropdownField() {
    this.planetsLoop = this._planets;
    this.isDropFieldOpen = true;
  }

  disableField(index: any) {
    return this.disabledBooleanArray[index] ? 'isDisabled' : '';
  }

  selectedVehicleData(data: any) {
    //console.log(this.isFirstTime);
    data.previousItem = this.prevSelectedVehicle;
    this.selectedVehicle.emit(data);
    this.prevSelectedVehicle = data.currentItem;
    this.service.addToFinalData(
      {
        current: data.currentItem.name,
        prev: data.previousItem
          ? data.previousItem.name
          : data.currentItem.name,
      },
      {
        current: this.firstDestination.name,
        prev: this.prevSelectedDestination
          ? this.prevSelectedDestination
          : this.firstDestination.name,
      },
      this.isFirstTime
    );
    this.isFirstTime = false;
    //console.log(this.isFirstTime);
  }

  addToFinalData() {}
}
