import { setLocalStorage, getLocalStorage } from "./helper.js";

const todoButton = document.querySelector('.todo__button');
const todoTaskDisplay = document.querySelector('.todo__task-display');
const todoInput = document.querySelector('#todoInput');
const tasksList = document.querySelector('.task-display__tasks');

const allTasksTab = document.querySelector('.tab__all-tasks');
const doneTasksTab = document.querySelector('.tab__done-tasks');
const textBanner = document.querySelector('.p-settings');
let showAllTasks = true;
let todoList;

window.addEventListener('load', () => {
   todoList = getLocalStorage('todoList');
   if (todoList == undefined) {
      todoList = [];
      setLocalStorage('todoList', JSON.stringify(todoList));
   } else {
      todoList = JSON.parse(todoList);
   }
})

todoButton.addEventListener('click', (e) => {
   if (todoTaskDisplay.style.opacity == 0) {
      todoTaskDisplay.style.opacity = 1;
      todoTaskDisplay.style.display = 'flex'
   } else {
      todoTaskDisplay.style.opacity = 0;
      setTimeout(() => todoTaskDisplay.style.display = 'none', 100)
   }
})

todoInput.addEventListener('keydown', (e) => {
   if (e.keyCode === 13) {
      e.target.blur()
   }
})

let countTasks = 0;
// ввод новой задачи
todoInput.addEventListener('change', (e) => {
   let task = { text: todoInput.value, done: false };
   todoList.push(task);
   setLocalStorage('todoList', JSON.stringify(todoList));
   createTask(tasksList, task, countTasks);
   countTasks += 1;
   todoInput.value = '';
})

function createTask(parent, task, index) {
   let li = document.createElement('li');
   li.classList.add('list-tasks');
   li.style.display = 'flex';
   li.style.flexDirection = 'row';
   li.style.justifyContent = 'space-between';
   li.style.alignItems = 'flex-start';
   li.style.width = '260px';
   li.style.transition = '0.3s';

   let deleteButton = document.createElement('button');
   deleteButton.classList.add('delete-task-icon');


   // удаление задачи из списка
   deleteButton.addEventListener('click', (e) => {
      li.classList.add('hide-li');
      todoList.splice(index, 1);
      setLocalStorage('todoList', JSON.stringify(todoList));
      removeTodoList();
      createTodoList(todoList, showAllTasks);
   })

   let checkbox = document.createElement('input');
   checkbox.setAttribute("type", "checkbox");
   checkbox.id = `task-check-${index}`;

   let label = document.createElement('label');
   label.setAttribute('for', checkbox.id);
   label.style.display = 'flex';
   label.style.flexDirection = 'row';

   let span = document.createElement('span');
   span.classList.add('checkbox-button');
   span.style.marginTop = '3.5px';

   let text = document.createElement('textarea');
   text.value = task.text;
   text.setAttribute("type", "text");
   text.classList.add('settings-input-task');
   text.style.width = '200px';
   text.style.fontFamily = 'Play';
   text.style.resize = 'none';
   text.style.overflow = 'hidden';
   text.style.minHeight = '20px';
   text.style.marginTop = '1px';
   text.style.paddingLeft = '3px';
   text.style.paddingBottom = '3px';
   text.style.height = Math.ceil(task.text.length / 21) * 18 + 'px';

   // изменение текста задачи в списке
   text.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
         e.target.blur()
         todoList.map((element, number) => {
            if (number === index) {
               element.text = e.target.value;
            }
            return element;
         })
         setLocalStorage('todoList', JSON.stringify(todoList));
      }
      e.target.style.height = Math.ceil(e.target.value.length / 21) * 18 + 'px';
   })

   // изменения статуса задачи в списке
   checkbox.addEventListener('change', (e) => {
      changeTaskStatus(e.target.checked, text, checkbox)
      todoList.map((element, number) => {
         if (number === index) {
            element.done = e.target.checked;
         }
         return element;
      })
      setLocalStorage('todoList', JSON.stringify(todoList));
   })

   li.appendChild(label);
   label.appendChild(checkbox);
   label.appendChild(span);

   li.appendChild(text);
   li.appendChild(deleteButton);

   parent.append(li);

   changeTaskStatus(task.done, text, checkbox);
   checkEmptyTodo();
}

function translateTodo(lng) {
   todoInput.placeholder = lng == 'en' ? 'New todo' : 'Новая задача';
   allTasksTab.textContent = lng == 'en' ? 'All tasks' : 'Все';
   doneTasksTab.textContent = lng == 'en' ? 'Done tasks' : 'Завершенные';
   textBanner.textContent = lng == 'en' ? 'There is nothing here yet' : 'Здесь пока ничего нет';
}

function changeTaskStatus(isActive, task, checkbox) {
   if (isActive) {
      checkbox.checked = true;
      task.style.textDecoration = 'line-through';
      task.style.opacity = '0.6';
      task.style.fontStyle = 'italic';
   } else {
      checkbox.checked = false;
      task.style.textDecoration = 'none';
      task.style.opacity = '1';
      task.style.fontStyle = 'normal';
   }
}

function createTodoList(list, showAll = true) {
   list.forEach((element, index) => {
      if (showAll || (!showAll && element.done)) {
         createTask(tasksList, element, index);
         countTasks += 1;
      }
   });
}

doneTasksTab.addEventListener('click', (e) => {
   doneTasksTab.style.opacity = '1';
   allTasksTab.style.opacity = '0.4';
   removeTodoList();
   showAllTasks = false;
   createTodoList(todoList, showAllTasks);
});

allTasksTab.addEventListener('click', (e) => {
   allTasksTab.style.opacity = '1';
   doneTasksTab.style.opacity = '0.4';
   removeTodoList();
   showAllTasks = true;
   createTodoList(todoList, showAllTasks);
})

function removeTodoList() {
   document.querySelectorAll('.list-tasks').forEach((element) => {
      element.remove();
      countTasks -= 1;
   })
   checkEmptyTodo();
}

function checkEmptyTodo() {
   if (todoList.length == 0) {
      textBanner.style.opacity = '0.4';
      textBanner.style.zIndex = 0;
   } else {
      textBanner.style.opacity = '0';
      textBanner.style.zIndex = -10;
   }
}

// closing TODO by clicking outside:
document.addEventListener('click', (e) => {
   let element = document.querySelector('.todo');
   let withinBoundaries = e.composedPath().includes(element);

   if (!withinBoundaries) {
      todoTaskDisplay.style.opacity = 0;
      setTimeout(() => todoTaskDisplay.style.display = 'none', 100)
   }
})

export {
   todoList, createTask, translateTodo, changeTaskStatus, createTodoList, removeTodoList, checkEmptyTodo
}