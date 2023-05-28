import { Injectable } from '@angular/core';
import { TodoListItem, TodoListItemInput, TodoListItemId, TodoListItemStatus } from '../interfaces/todo-list-item.interface';
import { TodoListApiService } from '../api/todo-list-api.service';
import { catchError, throwError, Observable } from 'rxjs';
import { ToastService } from '../modules/toasts/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoListItemService {
  constructor(
    private todoListApiService: TodoListApiService,
    private toastsService: ToastService,
  ) {}

  getAll(status: TodoListItemStatus | null = null): Observable<TodoListItem[]> {
    const params = status ? { status } : {};

    return this.todoListApiService.getItems(params).pipe(catchError((resp) => this.handleError(resp)));
  }

  update(item: TodoListItem): Observable<TodoListItem> {
    return this.todoListApiService.updateItem(item.id, item).pipe(catchError((resp) => this.handleError(resp)));
  }

  delete(id: TodoListItemId): Observable<void> {
    return this.todoListApiService.deleteItem(id).pipe(catchError((resp) => this.handleError(resp)))
  }

  create(data: Omit<TodoListItemInput, 'status'>): Observable<TodoListItem> {
    const status = TodoListItemStatus.InProgress;

    return this.todoListApiService.createItem({ ...data, status }).pipe(catchError((resp) => this.handleError(resp)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = '';

    switch(error.status) {
      case 404: message = 'Задача не найдена';
      break;
      default: message = error.message;
    }

    this.toastsService.showFailureToast(message);

    return throwError(() => error);
  }
}
