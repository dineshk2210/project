import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasePredictorComponent } from './disease-predictor.component';

describe('DiseasePredictorComponent', () => {
  let component: DiseasePredictorComponent;
  let fixture: ComponentFixture<DiseasePredictorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseasePredictorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiseasePredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
