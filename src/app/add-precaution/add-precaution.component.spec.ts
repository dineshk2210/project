import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrecautionComponent } from './add-precaution.component';

describe('AddPrecautionComponent', () => {
  let component: AddPrecautionComponent;
  let fixture: ComponentFixture<AddPrecautionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrecautionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrecautionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
