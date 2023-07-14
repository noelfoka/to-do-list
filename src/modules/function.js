import List from './list.js';

const form = document.getElementById('list-form');
const listContainer = document.getElementById('list-container');
let tasks = [];

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to reorder tasks after deletion
function reorderTasks() {
  tasks.forEach((task, index) => {
    task.id = index + 1;
  });
}

// Function to render the list
function renderList() {
  listContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const checkbox = document.createElement('input');
    const remove = document.createElement('button');
    const strdiv = document.createElement('div');
    const btndiv = document.createElement('div');

    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    const listItem = document.createElement('li');
    const edit = document.createElement('button');
    edit.className = 'editbtn';
    edit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    edit.addEventListener('click', () => {
      listItem.contentEditable = 'true';
    });

    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      if (checkbox.checked) {
        listItem.style.textDecoration = 'line-through';
        listItem.style.fontStyle = 'italic';
      } else {
        listItem.style.textDecoration = 'none';
        listItem.style.fontStyle = 'normal';
      }
      saveTasksToLocalStorage();
    });

    remove.className = 'removebtn';
    remove.innerHTML = '<i class="fas fa-trash"></i>';
    remove.addEventListener('click', () => {
      tasks.splice(index, 1);
      reorderTasks();
      renderList();
      saveTasksToLocalStorage();
    });

    listItem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        listItem.contentEditable = 'false';
        task.description = listItem.innerText.trim();
        saveTasksToLocalStorage();
      }
    });

    strdiv.appendChild(checkbox);
    strdiv.appendChild(document.createTextNode(task.description));
    btndiv.appendChild(edit);
    btndiv.appendChild(remove);
    listItem.appendChild(strdiv);
    listItem.appendChild(btndiv);
    listContainer.appendChild(listItem);
  });
}

// Function to handle form submission
function handleFormSubmit() {
  const input = document.getElementById('input-id');
  const maxId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0;
  const todo = new List(input.value, Boolean(), maxId + 1);
  tasks.push(todo);
  saveTasksToLocalStorage();
  renderList();
  input.value = '';
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  let id = 0;
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    id = tasks.length;
  }
  console.log(id);
}

// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  handleFormSubmit();
});

// Event listener for button click with ID "enter"
const enterBtn = document.getElementById('enter');
enterBtn.addEventListener('click', () => {
  handleFormSubmit();
});

// Event listener for Clear Completed Tasks Button
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  reorderTasks();
  saveTasksToLocalStorage();
  renderList();
});

// Load tasks from local storage and render the list
document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
  renderList();
});

export default Function;
