import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineBookstoreComponent } from './online-bookstore.component';

describe('OnlineBookstoreComponent', () => {
  let component: OnlineBookstoreComponent;
  let fixture: ComponentFixture<OnlineBookstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineBookstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineBookstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
