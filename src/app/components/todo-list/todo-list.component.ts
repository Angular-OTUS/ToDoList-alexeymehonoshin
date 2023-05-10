import { Component, OnInit } from '@angular/core';
import { TodoListItem, TodoListItemId, TodoListItemInput, TodoListItemStatus } from '../../interfaces/todo-list-item.interface';
import { TodoListItemService } from 'src/app/services/todo-list-item.service';
import { ToastService } from 'src/app/modules/toasts/services';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items: TodoListItem[] = [];
  selectedItemId: TodoListItemId | null = null;
  isLoading = true;
  filterByStatus: TodoListItemStatus | null = null;
  statuses = TodoListItemStatus;

  constructor(
    private todoListItemService: TodoListItemService,
    private toastsService: ToastService,
  ) {}

  ngOnInit(): void {
    this.loadTodoListItems();
  }

  loadTodoListItems() {
    this.isLoading = true;
    setTimeout(() => {
      this.todoListItemService.getAll(this.filterByStatus).subscribe(items => {
        this.isLoading = false;
        this.items = items;
      });
    }, 500);
  }

  get selectedItem(): TodoListItem | null {
    if (this.selectedItemId === null) {
      return null;
    }
  
    return this.items.find(item => item.id === this.selectedItemId) || null;
  }

  selectItem(id: TodoListItemId | null): void {
    this.selectedItemId = id;
  }

  createItem(data: Omit<TodoListItemInput, 'status'>): void {
    this.todoListItemService.create(data)
      .subscribe(item => {
        this.items.push(item);
        this.toastsService.showSuccessToast('Задача добавлена');
      });
  }

  deleteItem(id: TodoListItemId): void {
    this.todoListItemService.delete(id)
      .subscribe(() => {
        this.items = this.items.filter(item => item.id !== id);
        if (this.selectedItemId === id) {
          this.selectItem(null);
        }
        this.toastsService.showSuccessToast('Задача удалена');
      });
  }
}
