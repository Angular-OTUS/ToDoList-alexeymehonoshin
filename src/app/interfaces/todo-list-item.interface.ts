export interface TodoListItem {
  id: number;
  title: string;
  description: string;
}

export type TodoListItemId = TodoListItem['id'];
export type TodoListItemInput = Omit<TodoListItem, 'id'>;