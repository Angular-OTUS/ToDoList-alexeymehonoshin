import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemInlineEditComponent } from './todo-list-item-inline-edit.component';

describe('TodoListItemInlineEditComponent', () => {
  let component: TodoListItemInlineEditComponent;
  let fixture: ComponentFixture<TodoListItemInlineEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListItemInlineEditComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListItemInlineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
