import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Toast, ToastType } from '../interfaces/toast.interface'; 

interface ToastRemoveTimeouts {
  [key: Toast['id']]: NodeJS.Timeout
}

const removeDurationMs = 3000;
const maxCount = 10;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: Toast[] = [];
  private timeouts: ToastRemoveTimeouts = {}

  showSuccessToast(message: Toast['message'], duration = removeDurationMs) {
    this.showToast(ToastType.Success, 'Выполено', message, duration);
  }

  showFailureToast(message: Toast['message'], duration = removeDurationMs) {
    this.showToast(ToastType.Failure, 'Ошибка', message, duration);
  }

  getToasts(): Toast[] {
    return this.toasts;
  }

  removeToast(id: Toast['id']): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);

    if (this.timeouts[id]) {
      clearTimeout(this.timeouts[id]);
      delete this.timeouts[id];
    }
  }

  private showToast(type: ToastType, title: Toast['title'], message: Toast['message'], duration: number): void {
    this.removeOldestToast();

    const id = uuid();

    this.toasts.push({ id, title, message, type });
    this.timeouts[id] = setTimeout(() => this.removeToast(id), duration);
  }

  private removeOldestToast(): void {
    if (maxCount <= this.toasts.length) {
      const oldestToast = this.toasts.shift();

      if (oldestToast) {
        this.removeToast(oldestToast.id);
      }
    }
  }
}
