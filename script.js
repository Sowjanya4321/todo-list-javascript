const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if (filter === "active")
            return !task.completed;

        if (filter === "completed")
            return task.completed;

        return true;
    });

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div>
                <button onclick="toggleTask(${index})">✓</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        text,
        completed:false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

function toggleTask(index){

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();
    renderTasks();
}

function editTask(index){

    let newTask = prompt(
        "Edit Task",
        tasks[index].text
    );

    if(newTask){

        tasks[index].text = newTask;

        saveTasks();
        renderTasks();
    }
}

document.querySelectorAll("[data-filter]")
.forEach(btn => {

    btn.addEventListener("click", () => {

        renderTasks(
            btn.dataset.filter
        );
    });
});

renderTasks();
