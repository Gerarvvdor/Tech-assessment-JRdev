document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("taskInput");
  const taskList = document.getElementById("listContainer");
  const addButton = document.getElementById("addButton");

  // Load tasks from localStorage
  loadTasks();

  // Function to add new task
  addButton.addEventListener("click", function () {
    const task = inputField.value;
    if (task === "") {
      alert("El campo no puede estar vacío.");
      return;
    }
    addTask(task);
    inputField.value = "";
    saveTasks();
  });

  // Function to show new task
  function addTask(task, isCompleted = false) {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.innerHTML = `
            <span class="task-text">${task}</span>
            <div class="button-group">
                <button class="checkButton">✔</button>
                <button class="deleteButton">X</button>
            </div>
            
        `;
    if (isCompleted) {
      li.classList.add("checked");
    }
    taskList.appendChild(li);

    // Mark as completed
    li.querySelector(".checkButton").addEventListener("click", function (e) {
      e.stopPropagation();
      li.classList.toggle("checked");
      saveTasks();
    });

    // Delete task
    li.querySelector(".deleteButton").addEventListener("click", function (e) {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });
  }

  // Function to save tasks in localStorage
  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((li) => {
      tasks.push({
        text: li.querySelector("span").innerText,
        completed: li.classList.contains("checked"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      addTask(task.text, task.completed);
    });
  }
});
