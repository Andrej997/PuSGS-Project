import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustRentComponent } from './just-rent.component';

describe('JustRentComponent', () => {
  let component: JustRentComponent;
  let fixture: ComponentFixture<JustRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
