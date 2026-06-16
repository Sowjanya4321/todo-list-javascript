const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(currentFilter === "active")
            return !task.completed;

        if(currentFilter === "completed")
            return task.completed;

        return true;
    });

    filteredTasks.forEach(task => {

        const li = document.createElement("li");
        li.className = `task ${task.completed ? "completed" : ""}`;

        li.innerHTML = `
            <div>
                <input type="checkbox"
                    ${task.completed ? "checked" : ""}
                    data-id="${task.id}" class="toggle">

                <span>${task.text}</span>
            </div>

            <div class="actions">
                <button class="edit"
                        data-id="${task.id}">
                    Edit
                </button>

                <button class="delete"
                        data-id="${task.id}">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        id: Date.now(),
        text,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

taskList.addEventListener("click", (e) => {

    const id = Number(e.target.dataset.id);

    if(e.target.classList.contains("delete")) {

        tasks = tasks.filter(task => task.id !== id);

    } else if(e.target.classList.contains("edit")) {

        const newText = prompt("Edit Task:");

        if(newText) {
            const task = tasks.find(t => t.id === id);
            task.text = newText;
        }
    }

    saveTasks();
    renderTasks();
});

taskList.addEventListener("change", (e) => {

    if(e.target.classList.contains("toggle")) {

        const id = Number(e.target.dataset.id);

        const task = tasks.find(task => task.id === id);

        task.completed = e.target.checked;

        saveTasks();
        renderTasks();
    }
});

filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelector(".active")
                .classList.remove("active");

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        renderTasks();
    });
});

renderTasks();
