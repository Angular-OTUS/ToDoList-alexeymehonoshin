import { Injectable } from '@angular/core';
import { TodoListItem, TodoListItemInput, TodoListItemId } from '../interfaces/todo-list-item.interface';
import { TodoListItemStatuses } from '../enums/todo-list-item-statuses.enum';
import { TodoListApiService } from '../api/todo-list-api.service';
import { catchError, throwError, Observable } from 'rxjs';
import { ToastService } from './toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoListItemService {
  constructor(
    private todoListApiService: TodoListApiService,
    private toastsService: ToastService,
  ) {}

  getAll$(status = ''): Observable<TodoListItem[]> {
    const params = status ? { status } : {};

    return this.todoListApiService.getItems$(params).pipe(catchError(this.handleError.bind(this)));
  }

  update$(item: TodoListItem): Observable<TodoListItem> {
    return this.todoListApiService.updateItem$(item.id, item).pipe(catchError(this.handleError.bind(this)));
  }

  delete$(id: TodoListItemId): Observable<void> {
    return this.todoListApiService.deleteItem$(id).pipe(catchError(this.handleError.bind(this)))
  }

  create$(data: Omit<TodoListItemInput, 'status'>): Observable<TodoListItem> {
    const status = TodoListItemStatuses.InProgress;

    return this.todoListApiService.createItem$({ ...data, status }).pipe(catchError(this.handleError.bind(this)));
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
