export default class Task {
    constructor(content) {
        this.content = content;
        this.parent = document.querySelector('.todo-list');
    }

    renderContent() {
        return `<p class="todo-task__content">${this.content}</p>`;
    }

    renderTask() {
        const taskTemplate = document.querySelector("#todo-task");
        const newTask = taskTemplate.content.cloneNode(true);
        const newTaskContent = newTask.querySelector('.todo-task');
        const newTaskCheckbox = newTaskContent.querySelector('.todo-task__check');
        newTaskCheckbox.insertAdjacentHTML('afterend', this.renderContent());
        newTaskContent.classList.add('todo-task--filled');
        this.parent.appendChild(newTask);
        return newTaskContent;
    }

    editTask(newContent) {
        this.content = newContent;
        return this.content;
    }
}