import { ComponentFixture, TestBed } from '@angular/core/testing';
import Utils from './utils';

describe('Utils Component test', () => {
    let price : any;

  beforeEach(() => {
    TestBed.configureTestingModule({})
  });

  it('should create Test Method', () => {
    price = Utils.formatPrice(12.000);
    expect(price).toEqual(12.00);
  });


});