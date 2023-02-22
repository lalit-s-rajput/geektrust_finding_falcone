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

@Component({
  selector: 'app-single-dropdown-view',
  templateUrl: './single-dropdown-view.component.html',
  styleUrls: ['./single-dropdown-view.component.scss'],
})
export class SingleDropdownViewComponent implements OnInit {
  _planets: Planets[] = [];
  planetsLoop: Planets[] = [];
  disabledBooleanArray = [false, false, false, false, false, false];
  firstDestination: any = '';
  selectedIndex = undefined;
  _vehicles: Vehicle[] = [];
  finalData = [];
  selectedDestinations = [];
  wasInside = false;
  @HostListener('click')
  clickInside() {
    console.log('inside');
    this.wasInside = true;
  }
  @HostListener('document:click')
  clickOutside() {
    if (!this.wasInside) {
      console.log('outsideClicked');
      this.planetsLoop = [];
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
    console.log(data);
    if (data) {
      this._planets = data;
      // this.planetsLoop = data;
    }
  }
  @Input() set vehicle(data: Vehicle[] | null) {
    console.log(data);
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

  ngOnInit(): void {}
  setData(target: any) {
    // console.log(data);
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
    this.firstDestination = item.name;
    this.planetsLoop = [];
  }
  openDropdownField() {
    this.planetsLoop = this._planets;
  }

  disableField(index: any) {
    return this.disabledBooleanArray[index] ? 'isDisabled' : '';
  }
}
