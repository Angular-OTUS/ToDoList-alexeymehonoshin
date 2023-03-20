import { Component, OnInit } from '@angular/core';
import { TodoListItem } from '../../interfaces/todo-list-item.interface';

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
  selectedItem: TodoListItem | undefined = undefined;
  isLoading = true;

  ngOnInit(): void {
    this.items = dummyItems;
    setTimeout(() => this.isLoading = false, 500);
  }

  selectItem(item: TodoListItem): void {
    this.selectedItem = item;
  }

  closeItem(): void {
    this.selectedItem = undefined;
  }

  createItem(data: { title: string, description: string }): void {
    let maxId = (this.items[0]?.id || 0);
    this.items.forEach(item => maxId = item.id > maxId ? item.id : maxId);

    this.items.push({
      id: maxId + 1,
      title: data.title,
      description: data.description,
    });
  }

  deleteItem(itemId: number): void {
    this.items = this.items.filter(item => item.id !== itemId);

    if (this.selectedItem?.id === itemId) {
      this.selectedItem = undefined;
    }
  }
}
