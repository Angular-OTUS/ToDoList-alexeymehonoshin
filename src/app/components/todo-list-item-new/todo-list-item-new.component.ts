import { Component, EventEmitter, Output } from '@angular/core';
import { TodoListItemInput } from '../../interfaces/todo-list-item.interface';

@Component({
  selector: 'app-todo-list-item-new',
  templateUrl: './todo-list-item-new.component.html',
  styleUrls: ['./todo-list-item-new.component.scss'],
})
export class TodoListItemNewComponent {
  title = '';
  description = '';

  @Output() itemCreated = new EventEmitter<TodoListItemInput>();

  onCreate() {
    this.itemCreated.emit({
      title: this.title.trim(),
      description: this.description.trim(),
    });
    this.title = '';
    this.description = '';
  }

  isValid(): boolean {
    return this.isTitleValid() && this.isDescriptionValid();
  }

  private minTitleLength = 1;
  private maxTitleLength = 100;
  private minDescriptionLength = 1;
  private maxDescriptionLength = 500;

  private isDescriptionValid(): boolean {
    const description = this.description.trim();
    
    if (description.length < this.minDescriptionLength) return false;
    if (description.length > this.maxDescriptionLength) return false;

    return true;
  }

  private isTitleValid(): boolean {
    const title = this.title.trim();
    
    if (title.length < this.minTitleLength) return false;
    if (title.length > this.maxTitleLength) return false;

    return true
  }
}