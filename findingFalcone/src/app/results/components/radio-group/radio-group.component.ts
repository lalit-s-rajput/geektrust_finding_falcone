import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Vehicle } from 'src/app/core/interface/interface';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent implements OnInit {
  vehicleData: Vehicle[] = [];
  previouslySelected:Vehicle|null = null;
  @Output() selectedItem = new EventEmitter();
  constructor(private resultService: ResultsService) {}
  ngOnInit(): void {
    this.resultService.vehicleObservable.subscribe((data) => {
      this.vehicleData = data;
    });
  }

  itemSelected(event: any, item: Vehicle) {
    this.selectedItem.emit({
      currentItem:item,
      previousItem:(!this.previouslySelected)?null:this.previouslySelected
    });
    this.previouslySelected = item;
    // if(!this.previouslySelected){
    //   this.selectedItem.emit({
    //     currentItem:item,
    //     previousItem:null
    //   });
    //   this.previouslySelected = item;
    // }else{
    //   this.selectedItem.emit({
    //     currentItem:item,
    //     previousItem:this.previouslySelected
    //   });
    //   this.previouslySelected = item;
    // }
  }
}
