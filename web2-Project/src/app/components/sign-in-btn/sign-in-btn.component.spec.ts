import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInBtnComponent } from './sign-in-btn.component';

describe('SignInBtnComponent', () => {
  let component: SignInBtnComponent;
  let fixture: ComponentFixture<SignInBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
