import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Planets, Vehicle } from 'src/app/core/interface/interface';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent implements OnInit {
  vehicleData: Vehicle[] = [];
  previouslySelected:Vehicle|null = null;

  _selectedDestination:any = null;
  @Input() set firstDestination(data:any){
    this._selectedDestination = data;
    this.vehicleData = this.vehicleData;
    this.resultService.resetVehicleData();
  }
  @Output() selectedItem = new EventEmitter();
  constructor(private resultService: ResultsService) {}
  ngOnInit(): void {
    this.resultService.vehicleObservable.subscribe((data) => {
      this.vehicleData = data;
      if(this._selectedDestination){
        this.removeVehicle();
      }
    });
  }

  itemSelected(event: any, item: Vehicle) {
    this.selectedItem.emit({
      currentItem:item,
      previousItem:(!this.previouslySelected)?null:this.previouslySelected
    });
    this.previouslySelected = item;
  }

  removeVehicle(){
    this.vehicleData = this.vehicleData.filter((vehicle:Vehicle)=>{
      return vehicle.max_distance>=this._selectedDestination?.distance;
    });
  }
}
