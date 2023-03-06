import { Injectable } from '@angular/core';
import { TodoListItem } from '../interfaces/todo-list-item.interface';
import { TodoListItemStatuses } from '../enums/todo-list-item-statuses.enum';
import { v4 as uuid } from 'uuid';

type ItemId = TodoListItem['id'];

@Injectable({
  providedIn: 'root',
})
export class TodoListItemService {
  private items: TodoListItem[] = [
    {
      id: uuid(),
      title: 'Описание задачи 1',
      description: 'Текст задачи 1',
      status: TodoListItemStatuses.InProgress,
    },
    {
      id: uuid(),
      title: 'Очень длинное описание задачи 2',
      description: 'Текст задачи 2 Очень длинное описание задачи, отображающееся на нескольких строчках',
      status: TodoListItemStatuses.InProgress,
    },
    {
      id: uuid(),
      title: 'Описание задачи 3',
      description: 'Текст задачи 3',
      status: TodoListItemStatuses.InProgress,
    },
    {
      id: uuid(),
      title: 'Описание задачи 4',
      description: 'Текст задачи 4',
      status: TodoListItemStatuses.Completed,
    },
  ];

  getItems(): TodoListItem[] {
    return this.items;
  }

  update(id: ItemId, title: string): void {
    for(const item of this.items) {
      if (item.id === id) {
        item.title = title;
        break;
      }
    }
  }

  delete(id: ItemId): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  create(data: Omit<TodoListItem, 'id' | 'status'>) {
    const item = {
      id: uuid(),
      title: data.title,
      description: data.description,
      status: TodoListItemStatuses.InProgress,
    };

    this.items.push(item);
  }

  toggleStatus(id: ItemId): void {
    for(const item of this.items) {
      if (item.id === id) {
        if (item.status === TodoListItemStatuses.Completed) {
          item.status = TodoListItemStatuses.InProgress;
        } else {
          item.status = TodoListItemStatuses.Completed;
        }

        break;
      }
    }
  }
}
