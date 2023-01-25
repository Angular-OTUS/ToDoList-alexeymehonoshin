import { Component } from '@angular/core';
import { TodoListItem } from '../../interfaces/todo-list-item.interface';

const dummyItems: TodoListItem[] = [
  { id: 0, text: 'Задача 1' },
  { id: 1, text: 'Задача 2 Очень длинное описание задачи, отображающееся на нескольких строчках' },
  { id: 2, text: 'Задача 3' },
  { id: 3, text: 'Задача 4' }
];

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  items: TodoListItem[] = [];

  ngOnInit() {
    this.items = dummyItems;
  }

  createItem(text: string) {
    let maxId = (this.items[0]?.id || 0);
    this.items.forEach(item => maxId = item.id > maxId ? item.id : maxId);

    this.items.push({ id: maxId + 1, text });
  }

  deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }
}