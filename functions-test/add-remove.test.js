/**
 * @jest-environment jsdom
 */
import { getAddedTodos } from '../src/module/newTask.js';
import { todo } from '../src/module/displayTask.js';
import deleteTask from '../src/module/remove.js';
// import deleteTask from '../src/module/remove.js';

const createMock = (value) => {
  document.body.innerHTML = `
    <input type= "text" id= "newToDo" value = ${value}>
      <li class = "task-list"></li>
    `;
};

describe('CreateMock', () => {
  it('Create a li in the document', () => {
    createMock();
    const list = document.querySelectorAll('.task-list');
    expect(list).toHaveLength(1);
  });
});

/*  Test add function */

function addInputdiv(value, input) {
  input.value = value;
}

describe('Add Tasks', () => {
  it('Creates a lu element inside the task list', () => {
    createMock('div-1');
    const taskSection = document.querySelector('.task-list');

    jest.spyOn(Storage.prototype, 'setItem');
    Object.setPrototypeOf(localStorage.setItem, jest.fn());

    getAddedTodos();
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(taskSection.children[0].className).toEqual('allTodos');
  });

  it('Creates a li element inside the allTodos', () => {
    createMock('div-2');
    const taskSection = document.querySelector('.task-list');

    jest.spyOn(Storage.prototype, 'setItem');
    Object.setPrototypeOf(localStorage.setItem, jest.fn());

    getAddedTodos();
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(taskSection.children[0].children[0].className).toEqual('todo');
  });

  it('Checks the number of divs that have been added', () => {
    todo.allTodos = [];
    createMock('div-3');

    const taskSection = document.querySelector('.task-list');
    const newTodo = document.getElementById('newToDo');
    jest.spyOn(Storage.prototype, 'setItem');
    Object.setPrototypeOf(localStorage.setItem, jest.fn());

    getAddedTodos();
    addInputdiv('div-4', newTodo);
    getAddedTodos();
    addInputdiv('div-5', newTodo);
    getAddedTodos();
    addInputdiv('div-6', newTodo);
    getAddedTodos();

    expect(localStorage.setItem).toHaveBeenCalledTimes(6);

    expect(taskSection.children[0].children.length).toEqual(4);
  });

  /* Test remove function */
  it('Remove the exact number of tasks from the list ', () => {
    todo.allTodos = [];
    createMock('div-1');
    localStorage.clear();
    const taskSection = document.querySelector('.task-list');
    getAddedTodos();
    deleteTask(1);
    expect(taskSection.children.length).toEqual(0);
  });
  it('Remove the exact number of tasks from the list ', () => {
    todo.allTodos = [];
    createMock('div-1');
    localStorage.clear();
    const taskSection = document.querySelector('.task-list');
    const newTodo = document.getElementById('newToDo');
    getAddedTodos();
    addInputdiv('div-2', newTodo);
    getAddedTodos();
    deleteTask(2);
    expect(taskSection.children[0].children.length).toEqual(1);
  });
  it('Remove the exact number of tasks from the list ', () => {
    todo.allTodos = [];
    createMock('div-1');
    localStorage.clear();
    const taskSection = document.querySelector('.task-list');
    const newTodo = document.getElementById('newToDo');
    getAddedTodos();
    addInputdiv('div-2', newTodo);
    getAddedTodos();
    deleteTask(1);
    addInputdiv('div-3', newTodo);
    getAddedTodos();
    expect(taskSection.children[0].children.length).toEqual(2);
  });
});
