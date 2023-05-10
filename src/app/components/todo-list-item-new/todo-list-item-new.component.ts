import { Component, EventEmitter, Output } from '@angular/core';
import { TodoListItemInput } from '../../interfaces/todo-list-item.interface';
import { NgForm } from '@angular/forms';
import { todoListItemConsts } from 'src/app/consts/todo-list-item.consts';

@Component({
  selector: 'app-todo-list-item-new',
  templateUrl: './todo-list-item-new.component.html',
  styleUrls: ['./todo-list-item-new.component.scss'],
})
export class TodoListItemNewComponent {
  item: Omit<TodoListItemInput, 'status'> = {
    title: '',
    description: ''
  };
  validations = todoListItemConsts.validations;

  @Output() itemCreated = new EventEmitter<TodoListItemInput>();

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    
    this.itemCreated.emit(form.value)
    this.clearValues(form);
  }

  private clearValues(form: NgForm) {
    this.item.title = '';
    this.item.description = '';
    form.resetForm();
  }
}