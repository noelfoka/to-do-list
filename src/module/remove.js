import { createTodo, todo } from './displayTask.js';

const deleteTask = (index) => {
  todo.deleteTodo(index);
  todo.saveTodo();
  createTodo();
};

export default deleteTask;