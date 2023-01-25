import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'todo-list-item-new',
  templateUrl: './todo-list-item-new.component.html',
  styleUrls: ['./todo-list-item-new.component.scss']
})
export class TodoListItemNewComponent {
  text: string = '';
  private minTextLength = 1;
  private maxTextLength = 500;

  @Output('item-created') itemCreated = new EventEmitter<string>();

  isValid(): boolean {
    const text = this.text.trim();
    
    return text.length >= this.minTextLength && text.length <= this.maxTextLength;
  }

  isInvalid(): boolean {
    return !this.isValid();
  }

  onCreate() {
    this.itemCreated.emit(this.text.trim());
    this.text = '';
  }
}