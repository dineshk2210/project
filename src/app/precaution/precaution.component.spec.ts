import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecautionComponent } from './precaution.component';

describe('PrecautionComponent', () => {
  let component: PrecautionComponent;
  let fixture: ComponentFixture<PrecautionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecautionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecautionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
