// import lodash from 'lodash';
import './style.css';

const tasks = [
  {
    description: 'Wash the dishes',
    completed: true,
    index: 0,
  },
  {
    description: 'Complete To Do list project',
    completed: true,
    index: 1,
  },
];

// const _ = lodash;

function populateTaskLists() {
  const taskList1 = document.getElementById('task-list-1');
  const taskList2 = document.getElementById('task-list-2');

  if (taskList1 && taskList2) {
    for (let i = 0; i < tasks.length; i + 1) {
      const task = tasks[i];
      const listItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      const label = document.createElement('label');
      label.htmlFor = task.index;
      label.innerHTML = task.description;
      listItem.appendChild(checkbox);
      listItem.appendChild(label);

      if (i % 2 === 0) {
        taskList1.appendChild(listItem);
      } else {
        taskList2.appendChild(listItem);
      }
    }
  }
}

function clearCompletedTasks() {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');

  for (let i = 0; i < checkboxes.length; i + 1) {
    if (checkboxes[i].checked) {
      checkboxes[i].parentNode.remove();
    }
  }
}

window.addEventListener('load', () => {
  populateTaskLists();

  const clearCompletedBtn = document.getElementById('clear-completed-btn');
  clearCompletedBtn.addEventListener('click', () => {
    clearCompletedTasks();
  });
});
