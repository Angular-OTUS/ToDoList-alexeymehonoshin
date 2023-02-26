import { Component, OnInit } from '@angular/core';
import { TodoListItem, TodoListItemId, TodoListItemInput } from '../../interfaces/todo-list-item.interface';
import { ToastService } from 'src/app/services/toast.service';
import { TodoListItemService } from 'src/app/services/todo-list-item.service';
import { TodoListItemStatuses } from 'src/app/enums/todo-list-item-statuses.enum';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items: TodoListItem[] = [];
  selectedItemId: TodoListItemId | null = null;
  isLoading = true;
  filterByStatus: TodoListItemStatuses | '' = '';
  statuses = TodoListItemStatuses;

  constructor(
    private todoListItemService: TodoListItemService,
    private toastsService: ToastService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadTodoListItems();
      this.isLoading = false;
    }, 500);
  }

  loadTodoListItems() {
    this.todoListItemService.getAll$(this.filterByStatus).subscribe(items => this.items = items);
  }

  get selectedItem(): TodoListItem | null {
    if (this.selectedItemId === null) {
      return null;
    }
  
    return this.items.find(item => item.id === this.selectedItemId) || null;
  }

  selectItem(id: TodoListItemId): void {
    this.selectedItemId = id;
  }

  unselectItem(): void {
    this.selectedItemId = null;
  }

  createItem(data: Omit<TodoListItemInput, 'status'>): void {
    this.todoListItemService.create$(data)
      .subscribe(item => {
        this.items.push(item);
        this.toastsService.showSuccessToast('Задача добавлена');
      });
  }

  deleteItem(id: TodoListItemId): void {
    this.todoListItemService.delete$(id)
      .subscribe(() => {
        this.items = this.items.filter(item => item.id !== id);
        if (this.selectedItem?.id === id) {
          this.unselectItem();
        }
        this.toastsService.showSuccessToast('Задача удалена');
      });
  }
}
