import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { TodoListItemService } from 'src/app/services/todo-list-item.service';
import { TodoListItem } from '../../interfaces/todo-list-item.interface';

type CreatedFields = Omit<TodoListItem, 'id'>;
type ItemId = TodoListItem['id'];

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items: TodoListItem[] = [];
  selectedItem?: TodoListItem;
  isLoading = true;

  constructor(
    private todoListItemService: TodoListItemService,
    private toastsService: ToastService,
  ) {}

  ngOnInit(): void {
    this.items = this.todoListItemService.getItems();
    setTimeout(() => this.isLoading = false, 500);
  }

  selectItem(id?: ItemId): void {
    if (id === undefined) {
      this.selectedItem = undefined;
    } else {
      this.selectedItem = this.items.find(item => item.id === id);
    }
  }

  closeItem(): void {
    this.selectedItem = undefined;
  }

  createItem(data: CreatedFields): void {
    this.todoListItemService.create(data);
    this.refreshItems();
    this.toastsService.showToast('Создано', data.title);
  }

  deleteItem(id: ItemId): void {
    this.todoListItemService.delete(id);
    this.refreshItems();

    if (this.selectedItem?.id === id) {
      this.selectedItem = undefined;
    }
  }

  private refreshItems() {
    this.items = this.todoListItemService.getItems();
  }
}
