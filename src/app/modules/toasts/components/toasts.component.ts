import { Component } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { Toast } from '../interfaces/toast.interface';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent {
  constructor(
    private toastService: ToastService,
  ) {}

  getToasts(): Toast[] {
    return this.toastService.getToasts();
  }

  removeToast(id: Toast['id']) {
    this.toastService.removeToast(id);
  }
}
