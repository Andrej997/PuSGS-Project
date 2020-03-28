import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInBtnComponent } from './log-in-btn.component';

describe('LogInBtnComponent', () => {
  let component: LogInBtnComponent;
  let fixture: ComponentFixture<LogInBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
