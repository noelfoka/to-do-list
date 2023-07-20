import { createTodo, todo } from './displayTask.js';

const populate = () => {
  if (localStorage.getItem('todos')) {
    todo.getStoredTodos();
    createTodo();
  } else {
    createTodo();
  }
};

export default populate;