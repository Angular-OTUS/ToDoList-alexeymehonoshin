export enum TodoListItemStatus {
  InProgress = 'in-progress',
  Completed = 'completed',
}

export interface TodoListItem {
  id: string;
  title: string;
  description: string;
  status: TodoListItemStatus;
}

export type TodoListItemId = TodoListItem['id'];
export type TodoListItemInput = Omit<TodoListItem, 'id'>;