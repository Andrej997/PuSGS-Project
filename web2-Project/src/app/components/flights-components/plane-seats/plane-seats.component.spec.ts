import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneSeatsComponent } from './plane-seats.component';

describe('PlaneSeatsComponent', () => {
  let component: PlaneSeatsComponent;
  let fixture: ComponentFixture<PlaneSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
