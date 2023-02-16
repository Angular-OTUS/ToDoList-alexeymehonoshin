import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemNewComponent } from './todo-list-item-new.component';

describe('TodoListItemNewComponent', () => {
  let component: TodoListItemNewComponent;
  let fixture: ComponentFixture<TodoListItemNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListItemNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListItemNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});