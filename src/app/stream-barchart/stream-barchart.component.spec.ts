import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamBarchartComponent } from './stream-barchart.component';

describe('StreamBarchartComponent', () => {
  let component: StreamBarchartComponent;
  let fixture: ComponentFixture<StreamBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamBarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
