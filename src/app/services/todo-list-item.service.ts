import { Injectable } from '@angular/core';
import { TodoListItem } from '../interfaces/todo-list-item.interface';
import { v4 as uuid } from 'uuid';

type UpdatedFields = Partial<Omit<TodoListItem, 'id'>>;
type CreatedFields = Omit<TodoListItem, 'id'>;
type ItemId = TodoListItem['id'];

@Injectable({
  providedIn: 'root'
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

  fetchItems(): TodoListItem[] {
    return this.items;
  }

  update(id: ItemId, updatedFields: UpdatedFields): boolean {
    let result = false;

    for(let item of this.items) {
      if (item.id !== id) continue;

     // Object.keys(updatedFields).forEach(field => item[field] = updatedFields[field]);

      result = true;
      break;
    };

    return result;
  }

  delete(id: ItemId): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  create(createdFields: CreatedFields) {
    let maxId = (this.items[0]?.id || 0);
    
    this.items.forEach(item => maxId = item.id > maxId ? item.id : maxId);

    this.items.push({
      id: uuid(),
      title: createdFields.title,
      description: createdFields.description,
    });
  }
}
