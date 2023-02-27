import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { TodoListItemService } from 'src/app/services/todo-list-item.service';
import { TodoListItem } from '../../interfaces/todo-list-item.interface';

type ItemId = TodoListItem['id'];

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent {
  @Input() item!: TodoListItem;
  @Input() isSelected = false;
  @Output() itemSelected = new EventEmitter<ItemId>();
  @Output() itemDeleted = new EventEmitter<ItemId>();

  isInlineEdited = false;

  constructor(
    private todoListItemService: TodoListItemService,
    private toastsService: ToastService,
  ) {}

  @HostListener('dblclick')
  onDblClick(): void {
    this.toggleInlineUpdated();
  }

  onSelect(id: ItemId): void {
    if (this.isInlineEdited) return;

    if (this.isSelected) {
      this.itemSelected.emit(undefined);
    } else {
      this.itemSelected.emit(id);
    }
  }

  onDelete(id: ItemId): void {
    this.itemDeleted.emit(id);
  }

  onUpdate(title: string): void {
    this.todoListItemService.update(this.item.id, title);
    this.item.title = title;
    this.toggleInlineUpdated();
    this.toastsService.show('Добавлено', this.item.title);
  }

  toggleInlineUpdated(): void {
    this.isInlineEdited = !this.isInlineEdited;
  }
}