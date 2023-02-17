import { Component, Input } from '@angular/core';

type ButtonColors = 'primary' | 'warning' | undefined;

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() color: ButtonColors;
  @Input() disabled = false;
}