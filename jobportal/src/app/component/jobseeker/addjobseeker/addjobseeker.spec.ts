import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addjobseeker } from './addjobseeker';

describe('Addjobseeker', () => {
  let component: Addjobseeker;
  let fixture: ComponentFixture<Addjobseeker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addjobseeker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addjobseeker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
