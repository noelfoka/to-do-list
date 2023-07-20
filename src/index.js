import show from './module/show.js';
import { getAddedTodos, form } from './module/newTask.js';
import deleteTask from './module/remove.js';
import Completed from './module/Completed.js';
import './style.css';

const clearCompletedButton = document.getElementById('clear');

show();
form.addEventListener('submit', getAddedTodos);

document.addEventListener('click', (e) => {
  if (e.target.className === 'fa fa-trash') {
    deleteTask(e.target.id);
  }
});

clearCompletedButton.addEventListener('click', Completed);
