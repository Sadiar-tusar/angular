import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Policylist } from './policylist';

describe('Policylist', () => {
  let component: Policylist;
  let fixture: ComponentFixture<Policylist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Policylist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Policylist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
