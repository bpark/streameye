import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamTableComponent } from './stream-table.component';

describe('StreamTableComponent', () => {
  let component: StreamTableComponent;
  let fixture: ComponentFixture<StreamTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
