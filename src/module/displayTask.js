import TodoList from './listClass.js';

const todo = new TodoList();

const createTodo = () => {
  const listSection = document.querySelector('.task-list');
  listSection.replaceChildren();
  if (todo.allTodos.length > 0) {
    listSection.style.display = 'block';
    const listContainer = document.createElement('ul');
    listContainer.className = 'allTodos';
    listSection.appendChild(listContainer);
    todo.allTodos.map((a) => {
      const list = document.createElement('li');
      list.className = 'todo';

      const descrptContainer = document.createElement('div');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = 'checkbox';
      if (a.completed === true) {
        checkbox.checked = 'checked';
      }

      descrptContainer.appendChild(checkbox);

      const descrpt = document.createElement('p');
      descrpt.id = 'task-description';
      descrpt.textContent = a.description;
      descrptContainer.appendChild(descrpt);
      list.appendChild(descrptContainer);

      const dragIcon = document.createElement('i');
      dragIcon.className = 'fa fa-ellipsis-v';
      dragIcon.title = 'Drag';
      list.appendChild(dragIcon);

      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'fa fa-trash';
      deleteIcon.title = 'Delete';
      deleteIcon.id = a.index;

      const editIcon = document.createElement('i');
      editIcon.className = 'fa fa-edit';
      editIcon.id = a.index;
      editIcon.title = 'Edit';
      list.appendChild(editIcon);
      dragIcon.before(editIcon);

      const saveIcon = document.createElement('i');
      saveIcon.className = 'fa fa-save';
      saveIcon.id = 'save';
      saveIcon.title = 'Save';
      saveIcon.style.display = 'none';
      list.appendChild(saveIcon);
      deleteIcon.before(saveIcon);

      editIcon.onclick = () => {
        descrpt.contentEditable = 'true';
        descrpt.style.backgroundColor = '#faffb7';
        dragIcon.style.display = 'none';
        saveIcon.style.display = 'block';
        editIcon.style.display = 'none';
        checkbox.style.visibility = 'hidden';
      };

      checkbox.onclick = (e) => {
        todo.completedTodo(e.target.checked, a.index);
        descrpt.contentEditable = 'false';
        list.style.backgroundColor = '#80808033';
        descrpt.style.color = '#00000099';
        descrpt.style.textDecoration = 'line-through solid black 10%';
        list.appendChild(deleteIcon);
        dragIcon.style.display = 'none';
        editIcon.style.display = 'none';
        if (checkbox.checked === false) {
          createTodo();
        }
      };

      list.addEventListener('click', (e) => {
        if (a.completed === false) {
          if (e.target.id === 'save') {
            if (e.button === 1) {
              createTodo();
            } else {
              todo.editTodo(descrpt, a.index);
              createTodo();
            }
          }
        }
      });
      listContainer.append(list);
      return list;
    });
    listSection.appendChild(listContainer);
  }
};

export { createTodo, todo };
