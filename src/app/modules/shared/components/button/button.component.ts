import { Component, Input } from '@angular/core';

type ButtonColors = 'basic' | 'primary' | 'warning';
type ButtonTypes = 'link' | 'flat';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() color: ButtonColors = 'basic';
  @Input() disabled = false;
  @Input() type: ButtonTypes = 'flat';
}