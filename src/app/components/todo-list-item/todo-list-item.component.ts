import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { TodoListItemService } from 'src/app/services/todo-list-item.service';
import { TodoListItem, TodoListItemId } from '../../interfaces/todo-list-item.interface';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent {
  @Input() item!: TodoListItem;
  @Input() isSelected = false;

  @Input() isInlineEdited = false;

  @Output() itemDeleted = new EventEmitter<TodoListItemId>();
  @Output() itemInlineUpdated = new EventEmitter();

  constructor(
    private todoListItemService: TodoListItemService,
    private toastsService: ToastService,
  ) {}

  onDelete(id: TodoListItemId): void {
    console.log('TodoListItemComponent#onDelete', id)
    this.itemDeleted.emit(id);
  }

  onInlineUpdate(title: TodoListItem['title']): void {
    if (this.item.title !== title) {
      const item = this.todoListItemService.update(this.item.id, title);
  
      if (item) {
        this.item.title = item.title;
        this.toastsService.showToast('Обновлено', this.item.id);
      }
    }

    this.itemInlineUpdated.emit();
  }
}