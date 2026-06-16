function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        switch(currentFilter) {

            case "active":
                return !task.completed;

            case "completed":
                return task.completed;

            default:
                return true;
        }
    });

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = `task ${task.completed ? "completed" : ""}`;

        li.innerHTML = `
            <div class="task-left">
                <input
                    type="checkbox"
                    class="toggle"
                    data-id="${task.id}"
                    ${task.completed ? "checked" : ""}
                >

                <span>${task.text}</span>
            </div>

            <div class="actions">
                <button class="edit" data-id="${task.id}">
                    Edit
                </button>

                <button class="delete" data-id="${task.id}">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}
