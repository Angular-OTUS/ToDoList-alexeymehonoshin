import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Toast } from '../interfaces/toast.interface'; 

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: Toast[] = [];

  showToast(title: string, message: string = '', duration = 3000): void {
    const id = uuid();
  
    this.toasts.push({ id, title, message });

    setTimeout(() => { this.removeToast(id) }, duration);
  }

  getToasts(): Toast[] {
    return this.toasts;
  }

  removeToast(id: string): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }
}
