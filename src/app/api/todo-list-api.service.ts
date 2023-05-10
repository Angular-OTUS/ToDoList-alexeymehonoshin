import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoListItem } from '../interfaces/todo-list-item.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments';

type ItemId = TodoListItem['id'];
type CreatedFields = Omit<TodoListItem, 'id'>
type UpdatedFields = Partial<Omit<TodoListItem, 'id'>>

@Injectable({
  providedIn: 'root',
})
export class TodoListApiService {
  private readonly API_URL = environment.todoListApiUrl;

  constructor(
    private httpClient: HttpClient,
  ) {}

  getItems(params = {}): Observable<TodoListItem[]> {
    return this.httpClient.get<TodoListItem[]>(`${this.API_URL}/items`, { params });
  }

  updateItem(id: ItemId, data: UpdatedFields): Observable<TodoListItem> {
    return this.httpClient.put<TodoListItem>(`${this.API_URL}/items/${id}`, data);
  }

  deleteItem(id: ItemId): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/items/${id}`);
  }

  createItem(data: CreatedFields): Observable<TodoListItem> {
    return this.httpClient.post<TodoListItem>(`${this.API_URL}/items`, data);
  }
}
