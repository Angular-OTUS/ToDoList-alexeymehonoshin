import '../enums/todo-list-item-statuses.enum';
import { TodoListItemStatuses } from '../enums/todo-list-item-statuses.enum';

export interface TodoListItem {
  id: string;
  title: string;
  description: string;
  status: TodoListItemStatuses,
}