import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-formsvalidator',
  templateUrl: './formsvalidator.component.html',
  styleUrls: ['./formsvalidator.component.css'],
})
export class FormsvalidatorComponent implements OnChanges {
  control!: AbstractControl;
  reqiredMessage: string = 'This Field is required';
  maxLengthMessage: string = 'The Maximum length in this field is 10';
  emailValidMessage: string = 'please enter a valid email';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.reqiredMessage = changes['reqiredMessage'].currentValue();
  }
}
