import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoListItem } from '../../interfaces/todo-list-item.interface';

@Component({
  selector: 'todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent {
  @Input() item!: TodoListItem;
  @Output('item-deleted') itemDeleted = new EventEmitter<number>();

  onDelete(itemId: number) {
    this.itemDeleted.emit(itemId);
  }
}