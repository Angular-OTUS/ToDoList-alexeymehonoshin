import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoListItem, TodoListItemId } from '../../interfaces/todo-list-item.interface';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent {
  @Input() item!: TodoListItem;
  @Input() isSelected = false;
  @Output() itemDeleted = new EventEmitter<number>();

  onDelete(itemId: TodoListItemId) {
    this.itemDeleted.emit(itemId);
  }
}