import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { TodoListItem, TodoListItemId } from '../../interfaces/todo-list-item.interface';
import { TodoListItemStatuses } from 'src/app/enums/todo-list-item-statuses.enum';
import { TodoListItemService } from 'src/app/services/todo-list-item.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent {
  isTitleEditVisible = false;

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
    this.todoListItemService.update$({ ...this.item, title })
      .pipe(finalize(this.hideTitleEdit.bind(this)))
      .subscribe(item => {
        this.item.title = item.title;
        this.toastsService.showSuccessToast('Описание обновлено');
      });
  }

  toggleStatus(): void {
    const status = this.isCompleted() ? TodoListItemStatuses.InProgress : TodoListItemStatuses.Completed;

    this.todoListItemService.update$({ ...this.item, status })
      .subscribe(item => {
        this.item.status = item.status;
        this.toastsService.showSuccessToast('Статус обновлён');
      });
  }

  isCompleted(): boolean {
    return this.item.status === TodoListItemStatuses.Completed;
  }

  showTitleEdit(): void {
    this.isTitleEditVisible = true;
  }

  hideTitleEdit(): void {
    this.isTitleEditVisible = false;
  }
}