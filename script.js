let tasks = [];

function addTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const dueDate = document.getElementById("taskDueDate").value;
    const priority = document.getElementById("taskPriority").value;
    if (title === "") return;

    const task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        priority,
        completed: false
    };
    tasks.push(task);
    renderTasks();
}

function renderTasks(filter = 'all') {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.filter(task => 
        filter === 'all' || 
        (filter === 'pending' && !task.completed) || 
        (filter === 'completed' && task.completed)
    ).forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.title} (${task.priority})</span>
            <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function toggleComplete(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function filterTasks(filter) {
    renderTasks(filter);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});
