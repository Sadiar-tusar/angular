import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Creatcarbill } from './creatcarbill';

describe('Creatcarbill', () => {
  let component: Creatcarbill;
  let fixture: ComponentFixture<Creatcarbill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Creatcarbill]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Creatcarbill);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
