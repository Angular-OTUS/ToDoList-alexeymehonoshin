import { Component, OnInit } from '@angular/core';
import { TodoListItem } from '../../interfaces/todo-list-item.interface';

const dummyItems: TodoListItem[] = [
  { id: 0, title: 'Задача 1' },
  { id: 1, title: 'Задача 2 Очень длинное описание задачи, отображающееся на нескольких строчках' },
  { id: 2, title: 'Задача 3' },
  { id: 3, title: 'Задача 4' }
];

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  items: TodoListItem[] = [];

  ngOnInit() {
    this.items = dummyItems;
  }

  createItem(title: string) {
    let maxId = (this.items[0]?.id || 0);
    this.items.forEach(item => maxId = item.id > maxId ? item.id : maxId);

    this.items.push({ id: maxId + 1, title });
  }

  deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }
}
