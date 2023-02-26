import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Toast, ToastTypes } from '../interfaces/toast.interface'; 

interface ToastRemoveTimeouts {
  [key: Toast['id']]: NodeJS.Timeout
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly removeDurationMs = 3000;
  private readonly maxCount = 10;
  private toasts: Toast[] = [];
  private timeouts: ToastRemoveTimeouts = {}

  showSuccessToast(message: string, duration = this.removeDurationMs) {
    this.showToast(ToastTypes.SUCCESS, 'Выполено', message, duration);
  }

  showFailureToast(message: string, duration = this.removeDurationMs) {
    this.showToast(ToastTypes.FAILURE, 'Ошибка', message, duration);
  }

  getToasts(): Toast[] {
    return this.toasts;
  }

  removeToast(id: string): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    if (this.timeouts[id]) {
      clearTimeout(this.timeouts[id]);
      delete this.timeouts[id];
    }
  }

  private showToast(type: ToastTypes, title: string, message: string, duration = this.removeDurationMs): void {
    const id = uuid();
  
    if (this.maxCount <= this.toasts.length) {
      this.toasts.shift();
    }

    this.toasts.push({ id, title, message, type });
    this.timeouts[id] = setTimeout(() => this.removeToast(id), duration);
  }
}
