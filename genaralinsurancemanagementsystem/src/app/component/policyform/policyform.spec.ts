import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Policyform } from './policyform';

describe('Policyform', () => {
  let component: Policyform;
  let fixture: ComponentFixture<Policyform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Policyform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Policyform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
