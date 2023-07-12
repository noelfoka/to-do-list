import './style.css';

const toDoListItems = [
  {
    description: 'Finish project',
    completed: true,
    index: 0,
  },
  {
    description: 'Groceries',
    completed: true,
    index: 1,
  },
  {
    description: 'Fix laptop',
    completed: true,
    index: 2,
  },
];

function populateList() {
  const todoList = document.getElementById('todo-list');

  toDoListItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <input class="checkbox" type="checkbox" name="" value="">
    <span>${item.description}</span>
    `;
    todoList.appendChild(listItem);
  });
}

populateList();
