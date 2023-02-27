import { Injectable } from '@angular/core';
import { TodoListItem } from '../interfaces/todo-list-item.interface';
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
    },
    {
      id: uuid(),
      title: 'Очень длинное описание задачи 2',
      description: 'Текст задачи 2 Очень длинное описание задачи, отображающееся на нескольких строчках',
    },
    {
      id: uuid(),
      title: 'Описание задачи 3',
      description: 'Текст задачи 3',
    },
    {
      id: uuid(),
      title: 'Описание задачи 4',
      description: 'Текст задачи 4',
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

  create(data: Omit<TodoListItem, 'id'>) {
    const item = {
      id: uuid(),
      title: data.title,
      description: data.description,
    };

    this.items.push(item);
  }
}
