import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemTitleEditComponent } from './todo-list-item-title-edit.component';

describe('TodoListItemInlineEditComponent', () => {
  let component: TodoListItemTitleEditComponent;
  let fixture: ComponentFixture<TodoListItemTitleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListItemTitleEditComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListItemTitleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
