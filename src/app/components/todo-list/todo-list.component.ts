import { Component, OnInit } from '@angular/core';
import { TodoListItem, TodoListItemId, TodoListItemInput } from '../../interfaces/todo-list-item.interface';

const dummyItems: TodoListItem[] = [
  {
    id: 0,
    title: 'Описание задачи 1',
    description: 'Текст задачи 1',
  },
  {
    id: 1,
    title: 'Очень длинное описание задачи 2',
    description: 'Текст задачи 2 Очень длинное описание задачи, отображающееся на нескольких строчках',
  },
  {
    id: 2,
    title: 'Описание задачи 3',
    description: 'Текст задачи 3',
  },
  {
    id: 3,
    title: 'Описание задачи 4',
    description: 'Текст задачи 4',
  },
];

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items: TodoListItem[] = [];
  selectedItemId: TodoListItemId | null = null;
  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.items = dummyItems;
      this.isLoading = false;
    }, 500);
  }

  get selectedItem(): TodoListItem | null {
    if (this.selectedItemId === null) {
      return null;
    }
  
    return this.items.find(item => item.id === this.selectedItemId) || null;
  }

  selectItem(itemId: TodoListItemId): void {
    this.selectedItemId = itemId;
  }

  unselectItem(): void {
    this.selectedItemId = null;
  }

  createItem(data: TodoListItemInput): void {
    let maxId = (this.items[0]?.id || 0);
    this.items.forEach(item => maxId = item.id > maxId ? item.id : maxId);

    this.items.push({
      id: maxId + 1,
      title: data.title,
      description: data.description,
    });
  }

  deleteItem(itemId: TodoListItemId): void {
    this.items = this.items.filter(item => item.id !== itemId);

    if (this.selectedItemId === itemId) {
      this.unselectItem();
    }
  }
}
