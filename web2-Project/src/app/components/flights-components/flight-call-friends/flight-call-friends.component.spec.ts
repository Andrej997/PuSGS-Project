import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCallFriendsComponent } from './flight-call-friends.component';

describe('FlightCallFriendsComponent', () => {
  let component: FlightCallFriendsComponent;
  let fixture: ComponentFixture<FlightCallFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightCallFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightCallFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
