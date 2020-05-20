import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrReplaceServiceComponent } from './create-or-replace-service.component';

describe('CreateOrReplaceServiceComponent', () => {
  let component: CreateOrReplaceServiceComponent;
  let fixture: ComponentFixture<CreateOrReplaceServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrReplaceServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrReplaceServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
