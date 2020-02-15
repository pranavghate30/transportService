import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllRidesComponent } from './show-all-rides.component';

describe('ShowAllRidesComponent', () => {
  let component: ShowAllRidesComponent;
  let fixture: ComponentFixture<ShowAllRidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllRidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
