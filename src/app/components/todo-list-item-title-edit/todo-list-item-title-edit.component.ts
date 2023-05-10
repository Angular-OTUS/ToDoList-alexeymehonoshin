import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoListItem } from 'src/app/interfaces/todo-list-item.interface';
import { todoListItemValidation as validation } from 'src/app/consts/todo-list-item.consts';

@Component({
  selector: 'app-todo-list-item-title-edit',
  templateUrl: './todo-list-item-title-edit.component.html',
  styleUrls: ['./todo-list-item-title-edit.component.scss'],
})
export class TodoListItemTitleEditComponent {
  @Input() title: TodoListItem['title'] = '';
  @Output() titleUpdated = new EventEmitter<TodoListItem['title']>();

  isValid(): boolean {
    const title = this.title.trim();
    
    return !(title.length < validation.title.minLength || title.length > validation.title.maxLength);
  }
}
