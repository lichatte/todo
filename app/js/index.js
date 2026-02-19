import Task from './task.js';

const todoList = document.querySelector('.todo-list');
const taskArray = [];
let totalTasks = 0;

function createEditTask(e) {
    const editableInput = e.target;

    if (editableInput && editableInput.classList.contains('todo-task__input-text')) {
        const currentTask = editableInput.closest('.todo-task');
        const newText = editableInput.value;

        if (newText != '') {
            const taskId = currentTask.getAttribute('data-id');
            let taskObject;

            // If it's an existing task and we just want to update its content
            if (taskId) {
                taskObject = taskArray[taskId];
                currentTask.querySelector('.todo-task__content').innerText = taskObject.editTask(newText);
            // If it's a new task we render the template and append it to the list
            } else {
                taskObject = new Task(newText);
                const newTask = taskObject.renderTask();
                const newTaskID = `task-${totalTasks}`;
                newTask.setAttribute('data-id', totalTasks);
                newTask.setAttribute('id', newTaskID);
                newTask.querySelector('.todo-task__label').setAttribute('for', newTaskID);
                currentTask.insertAdjacentElement('beforebegin', newTask);
                taskArray.push(taskObject);
                totalTasks++;
            }

            editableInput.value = '';
        }

        editableInput.style.display = 'none';
        currentTask.classList.remove('todo-task--editable');
    }
}

function makeTaskEditable(task) {
    const innerInput = task.querySelector('.todo-task__input-text');
    task.classList.add('todo-task--editable');

    if (task.querySelector('.todo-task__content')) {
        innerInput.value = task.querySelector('.todo-task__content').innerHTML;
    }

    innerInput.style.display = 'block';
    innerInput.focus();
}

todoList.addEventListener('click',function(e) {
    const _this = e.target;

    if (_this && _this.classList.contains('todo-task__actions--edit')) {
        const task = _this.closest('.todo-task');
        makeTaskEditable(task);
    }
});

todoList.addEventListener('dblclick',function(e) {
    const _this = e.target;

    if (_this && _this.classList.contains('todo-task')) {
        makeTaskEditable(_this);
    }
});

todoList.addEventListener('focusout', createEditTask);

todoList.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        createEditTask(e);
    }
});