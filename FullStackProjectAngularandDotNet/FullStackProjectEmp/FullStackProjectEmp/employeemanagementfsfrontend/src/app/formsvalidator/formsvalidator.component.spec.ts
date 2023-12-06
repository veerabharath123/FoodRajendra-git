import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsvalidatorComponent } from './formsvalidator.component';

describe('FormsvalidatorComponent', () => {
  let component: FormsvalidatorComponent;
  let fixture: ComponentFixture<FormsvalidatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsvalidatorComponent]
    });
    fixture = TestBed.createComponent(FormsvalidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
