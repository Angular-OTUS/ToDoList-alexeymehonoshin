import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoListItem } from '../interfaces/todo-list-item.interface';
import { HttpClient } from '@angular/common/http';

type ItemId = TodoListItem['id'];
type CreatedFields = Omit<TodoListItem, 'id'>
type UpdatedFields = Partial<Omit<TodoListItem, 'id'>>

@Injectable({
  providedIn: 'root',
})
export class TodoListApiService {
  private readonly API_HOST = 'http://localhost:3000';

  constructor(
    private httpClient: HttpClient,
  ) {}

  getItems(params = {}): Observable<TodoListItem[]> {
    return this.httpClient.get<TodoListItem[]>(`${this.API_HOST}/items`, { params });
  }

  updateItem(id: ItemId, data: UpdatedFields): Observable<TodoListItem> {
    return this.httpClient.put<TodoListItem>(`${this.API_HOST}/items/${id}`, data);
  }

  deleteItem(id: ItemId): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_HOST}/items/${id}`);
  }

  createItem(data: CreatedFields): Observable<TodoListItem> {
    return this.httpClient.post<TodoListItem>(`${this.API_HOST}/items`, data);
  }
}
