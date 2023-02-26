import { Component, OnInit } from '@angular/core';
import { TodoListItem, TodoListItemId, TodoListItemInput } from '../../interfaces/todo-list-item.interface';
import { ToastService } from 'src/app/services/toast.service';
import { TodoListItemService } from 'src/app/services/todo-list-item.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items: TodoListItem[] = [];
  selectedItemId: TodoListItemId | null = null;
  inlineEditedItemId?: TodoListItemId | null = null;
  isLoading = true;

  constructor(
    private todoListItemService: TodoListItemService,
    private toastsService: ToastService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.items = this.todoListItemService.getItems();
      this.isLoading = false;
    }, 500);
  }

  get selectedItem(): TodoListItem | null {
    if (this.selectedItemId === null) {
      return null;
    }
  
    return this.items.find(item => item.id === this.selectedItemId) || null;
  }

  selectItem(id: TodoListItemId): void {
    console.log('TodoListComponent#selectItem', id)
    this.selectedItemId = id;
  }

  unselectItem(): void {
    this.selectedItemId = null;
  }

  showInlineEditItem(id: TodoListItemId): void {
    this.inlineEditedItemId = id;
  }

  hideInlineEditItem(): void {
    this.inlineEditedItemId = null;
  }

  createItem(data: TodoListItemInput): void {
    const item = this.todoListItemService.create(data);

    if (item) {
      this.items.push(item);
      this.toastsService.showToast('Создано', item.id);
    }
  }

  deleteItem(id: TodoListItemId): void {
    const isDeleted = this.todoListItemService.delete(id);

    if (isDeleted) {
      this.items = this.items.filter(item => item.id !== id);

      if (this.selectedItemId === id) {
        this.unselectItem();
      }

      this.toastsService.showToast('Удалено', id);
    }
  }
}
