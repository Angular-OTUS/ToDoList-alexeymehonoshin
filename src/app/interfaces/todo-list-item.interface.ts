import { TodoListItemStatuses } from 'src/app/enums/todo-list-item-statuses.enum';

export interface TodoListItem {
  id: string;
  title: string;
  description: string;
  status: TodoListItemStatuses;
}

export type TodoListItemId = TodoListItem['id'];
export type TodoListItemInput = Omit<TodoListItem, 'id'>;