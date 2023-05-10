import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastService } from 'src/app/modules/toasts/services';
import { TodoListItem, TodoListItemId, TodoListItemStatus } from '../../interfaces/todo-list-item.interface';
import { TodoListItemService } from 'src/app/services/todo-list-item.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent {
  isTitleEditing = false;

  @Input() item!: TodoListItem;
  @Input() isSelected = false;

  @Output() itemDeleted = new EventEmitter<TodoListItemId>();

  constructor(
    private todoListItemService: TodoListItemService,
    private toastsService: ToastService,
  ) {}

  onDelete(id: TodoListItemId): void {
    this.itemDeleted.emit(id);
  }

  updateTitle(title: TodoListItem['title']): void {
    this.toggleTitleEditing(false);
    this.todoListItemService.update({ ...this.item, title })
      .subscribe(item => {
        this.item.title = item.title;
        this.toastsService.showSuccessToast('Описание обновлено');
      });
  }

  toggleStatus(): void {
    const status = this.isCompleted() ? TodoListItemStatus.InProgress : TodoListItemStatus.Completed;

    this.todoListItemService.update({ ...this.item, status })
      .subscribe(item => {
        this.item.status = item.status;
        this.toastsService.showSuccessToast('Статус обновлён');
      });
  }

  isCompleted(): boolean {
    return this.item.status === TodoListItemStatus.Completed;
  }

  toggleTitleEditing(value = !this.isTitleEditing): void {
    this.isTitleEditing = value;
  }
}