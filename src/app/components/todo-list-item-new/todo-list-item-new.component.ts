import { Component, EventEmitter, Output } from '@angular/core';
import { TodoListItemInput } from '../../interfaces/todo-list-item.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo-list-item-new',
  templateUrl: './todo-list-item-new.component.html',
  styleUrls: ['./todo-list-item-new.component.scss'],
})
export class TodoListItemNewComponent {
  title = '';
  description = '';

  @Output() itemCreated = new EventEmitter<TodoListItemInput>();

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    
    this.itemCreated.emit(form.value)
    this.clearValues(form);
  }

  private clearValues(form: NgForm) {
    this.title = '';
    this.description = '';
    form.resetForm();
  }
}