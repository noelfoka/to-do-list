import { createTodo, todo } from './displayTask.js';

const form = document.getElementById('form');

const getAddedTodos = () => {
  const newTodo = document.getElementById('newToDo');
  const description = newTodo.value;
  if (description !== '') {
    todo.addTodo(description);
    createTodo();
    newTodo.value = '';
  }
};

export { getAddedTodos, form };
