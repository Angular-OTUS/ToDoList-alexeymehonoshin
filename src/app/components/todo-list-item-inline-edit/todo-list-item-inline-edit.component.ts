import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list-item-inline-edit',
  templateUrl: './todo-list-item-inline-edit.component.html',
  styleUrls: ['./todo-list-item-inline-edit.component.scss'],
})
export class TodoListItemInlineEditComponent {
  @Input() title = '';
  @Output() itemInlineUpdated = new EventEmitter<string>();

  private minTitleLength = 1;
  private maxTitleLength = 100;

  onItemInlineUpdate() {
    this.itemInlineUpdated.emit(this.title);
  }

  isValid(): boolean {
    const title = this.title.trim();
    
    if (title.length < this.minTitleLength) return false;
    if (title.length > this.maxTitleLength) return false;

    return true
  }
}
