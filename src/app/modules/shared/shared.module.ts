import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, SpinnerComponent, TooltipComponent } from './components/index';
import { TooltipDirective } from './directives/index';
import { ToastsModule } from '../toasts/toats.module';

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
    ToastsModule,
  ],
  providers: []
})
export class SharedModule { }
