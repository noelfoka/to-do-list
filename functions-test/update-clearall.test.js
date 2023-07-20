/**
 * @jest-environment jsdom
 */
import { getAddedTodos } from '../src/module/newTask.js';
import { todo } from '../src/module/displayTask.js';

const createMock = (value) => {
  document.body.innerHTML = `
     <input type= "text" id= "newToDo" value = ${value}>
     <li class="task-list"></li>
     `;
};

describe('CreateMock', () => {
  it('Create a li in the document', () => {
    createMock();
    const list = document.querySelectorAll('.task-list');
    expect(list).toHaveLength(1);
  });
});

function addInputdiv(value, input) {
  input.value = value;
}

/* Edit test function */

describe('Edit, clear all, and check the status of tasks.', () => {
  it('Edits the task text', () => {
    todo.allTodos = [];
    createMock('text-1');
    localStorage.clear();
    const taskSection = document.querySelector('.task-list');
    const newTodo = document.getElementById('newToDo');

    jest.spyOn(Storage.prototype, 'setItem');
    Object.setPrototypeOf(localStorage.setItem, jest.fn());

    getAddedTodos();
    addInputdiv('text-2', newTodo);
    getAddedTodos();
    addInputdiv('text-3', newTodo);
    getAddedTodos();
    const index = 1;
    const newtext = 'edited-1';
    const value = taskSection.children[0].children[index].querySelector(
      '#task-description',
    );
    value.textContent = newtext;

    todo.editTodo(value, index);

    expect(localStorage.setItem).toHaveBeenCalledTimes(4);

    expect(todo.allTodos[index - 1].description).toEqual(newtext);
  });

  /* Clear all test function */
  it('Remove all tasks from the list', () => {
    todo.allTodos = [];
    createMock('text-1');
    localStorage.clear();
    const newTodo = document.getElementById('newToDo');

    getAddedTodos();
    addInputdiv('text-2', newTodo);
    getAddedTodos();
    addInputdiv('text-3', newTodo);
    getAddedTodos();
    addInputdiv('text-3', newTodo);
    getAddedTodos();

    todo.clearAll();

    expect(todo.allTodos.length).toEqual(0);
  });
});
