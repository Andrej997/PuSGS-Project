import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlightDestinationComponent } from './create-flight-destination.component';

describe('CreateFlightDestinationComponent', () => {
  let component: CreateFlightDestinationComponent;
  let fixture: ComponentFixture<CreateFlightDestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFlightDestinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFlightDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
