const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearCompleted = document.getElementById("clearCompleted");

let currentFilter = "all";

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function updateCounter() {

    const activeTasks =
        tasks.filter(task => !task.completed).length;

    taskCounter.textContent =
        `${activeTasks} task(s) left`;
}

function renderTasks(filter = currentFilter) {

    currentFilter = filter;

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if (filter === "active") {
            return !task.completed;
        }

        if (filter === "completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(task => {

        const originalIndex =
            tasks.indexOf(task);

        const li =
            document.createElement("li");

        li.innerHTML = `

        <span class="${
            task.completed
                ? "completed"
                : ""
        }">

            ${task.text}

        </span>

        <div class="task-actions">

            <button
                class="complete-btn"
                onclick="toggleTask(${originalIndex})"
            >
                ✓
            </button>

            <button
                class="edit-btn"
                onclick="editTask(${originalIndex})"
            >
                Edit
            </button>

            <button
                class="delete-btn"
                onclick="deleteTask(${originalIndex})"
            >
                Delete
            </button>

        </div>

        `;

        taskList.appendChild(li);
    });

    updateCounter();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e) {

    if (e.key === "Enter") {
        addTask();
    }

});

function addTask() {

    const text =
        taskInput.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();

    renderTasks();

    taskInput.value = "";
}

function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    renderTasks();
}

function editTask(index) {

    let updatedTask =
        prompt(
            "Edit Task",
            tasks[index].text
        );

    if (
        updatedTask &&
        updatedTask.trim() !== ""
    ) {

        tasks[index].text =
            updatedTask.trim();

        saveTasks();

        renderTasks();
    }
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    renderTasks();
}

clearCompleted.addEventListener("click", () => {

    tasks =
        tasks.filter(
            task => !task.completed
        );

    saveTasks();

    renderTasks();
});

document
.querySelectorAll("[data-filter]")
.forEach(button => {

    button.addEventListener("click", () => {

        renderTasks(
            button.dataset.filter
        );

    });

});

renderTasks();
