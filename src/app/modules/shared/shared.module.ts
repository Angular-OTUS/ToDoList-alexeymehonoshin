import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, SpinnerComponent, TooltipComponent } from './components/index';
import { TooltipDirective } from './directives/index';

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
