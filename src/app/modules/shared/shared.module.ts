import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonComponent,
  SpinnerComponent,
} from './components/index';

@NgModule({
  declarations: [
    ButtonComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponent,
    SpinnerComponent,
  ],
})
export class SharedModule { }
