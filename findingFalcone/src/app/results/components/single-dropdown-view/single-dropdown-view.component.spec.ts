import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDropdownViewComponent } from './single-dropdown-view.component';

describe('SingleDropdownViewComponent', () => {
  let component: SingleDropdownViewComponent;
  let fixture: ComponentFixture<SingleDropdownViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDropdownViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleDropdownViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
