const TodoListItemFactory = require('./factories/todo-list-item.factory');

module.exports = () => {
  const todoListItemFactory = new TodoListItemFactory();
  
  const data = {
    items: todoListItemFactory.create(20)
  }

  return data;
}