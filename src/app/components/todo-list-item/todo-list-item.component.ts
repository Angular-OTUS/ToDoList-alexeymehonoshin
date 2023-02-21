import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoListItem } from '../../interfaces/todo-list-item.interface';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent {
  @Input() item!: TodoListItem;
  @Input() isSelected = false;
  @Output() itemSelected = new EventEmitter<number>();
  @Output() itemDeleted = new EventEmitter<number>();

  onSelect(itemId: number) {
    if (this.isSelected) {
      this.itemSelected.emit(undefined);
    } else {
      this.itemSelected.emit(itemId);
    }
  }

  onDelete(itemId: number) {
    this.itemDeleted.emit(itemId);
  }
}