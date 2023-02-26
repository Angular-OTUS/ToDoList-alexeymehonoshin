import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list-item-title-edit',
  templateUrl: './todo-list-item-title-edit.component.html',
  styleUrls: ['./todo-list-item-title-edit.component.scss'],
})
export class TodoListItemTitleEditComponent {
  @Input() title = '';
  @Output() titleUpdated = new EventEmitter<string>();

  private minTitleLength = 1;
  private maxTitleLength = 100;

  onTitleUpdate() {
    this.titleUpdated.emit(this.title);
  }

  isValid(): boolean {
    const title = this.title.trim();
    
    if (title.length < this.minTitleLength) return false;
    if (title.length > this.maxTitleLength) return false;

    return true
  }
}
