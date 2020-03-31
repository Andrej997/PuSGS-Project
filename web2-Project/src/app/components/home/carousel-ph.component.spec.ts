import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPhComponent } from './carousel-ph.component';

describe('CarouselPhComponent', () => {
  let component: CarouselPhComponent;
  let fixture: ComponentFixture<CarouselPhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselPhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselPhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
