import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonComponent,
  SpinnerComponent,
} from './components/index';

import {
  TooltipDirective,
} from './directives/index';
import { TooltipComponent } from './components/tooltip/tooltip.component';

@NgModule({
  declarations: [
    ButtonComponent,
    SpinnerComponent,
    TooltipComponent,
    TooltipDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponent,
    SpinnerComponent,
    TooltipDirective,
  ],
})
export class SharedModule { }
