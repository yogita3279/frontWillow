import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerModelComponent } from './buyer-model.component';

describe('BuyerModelComponent', () => {
  let component: BuyerModelComponent;
  let fixture: ComponentFixture<BuyerModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});





