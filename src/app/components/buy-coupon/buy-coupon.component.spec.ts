import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCouponComponent } from './buy-coupon.component';

describe('BuyCouponComponent', () => {
  let component: BuyCouponComponent;
  let fixture: ComponentFixture<BuyCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyCouponComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
