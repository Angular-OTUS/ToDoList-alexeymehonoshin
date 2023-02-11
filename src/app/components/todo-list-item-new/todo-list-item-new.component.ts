import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'todo-list-item-new',
  templateUrl: './todo-list-item-new.component.html',
  styleUrls: ['./todo-list-item-new.component.scss']
})
export class TodoListItemNewComponent {
  title: string = '';

  private minTitleLength = 1;
  private maxTitleLength = 500;

  @Output('item-created') itemCreated = new EventEmitter<string>();

  isValid(): boolean {
    const title = this.title.trim();
    
    return title.length >= this.minTitleLength && title.length <= this.maxTitleLength;
  }

  isInvalid(): boolean {
    return !this.isValid();
  }

  onCreate() {
    this.itemCreated.emit(this.title.trim());
    this.title = '';
  }
}