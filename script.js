const form = document.getElementById("inputForm");
const taskInput = document.querySelector(".task-input");
const dateInput = document.querySelector(".data-input");
const button = document.querySelector(".todo-button");
const selector = document.querySelector(".tasks-filter");
const taskList = document.querySelector(".tasks");

document.addEventListener("DOMContentLoaded", getTasks);
button.addEventListener("click", addTask);
selector.addEventListener("change", filterTasks);
taskList.addEventListener("click", deleteOrCheck);

function addTask(e) {
  e.preventDefault();

  if (!taskInput.value || !dateInput.value) {
    taskInput.setCustomValidity("You need to enter data");
  } else {
    taskInput.setCustomValidity("");

    const task = document.createElement("div");
    task.classList.add("task");

    const taskData = document.createElement("div");
    taskData.classList.add("taskData");

    const taskDescr = document.createElement("li");
    taskDescr.classList.add("taskDescr");
    taskDescr.innerText = taskInput.value;
    taskData.appendChild(taskDescr);

    const taskDeadline = document.createElement("div");
    taskDeadline.innerText = dateInput.value;
    taskDeadline.classList.add("taskDeadline");
    taskData.appendChild(taskDeadline);

    task.appendChild(taskData);

    const newTask = {
      task: taskInput.value,
      deadline: dateInput.value,
    };

    saveTask(newTask);

    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    checkButton.classList.add("compliteButton");
    task.appendChild(checkButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></li>';
    deleteButton.classList.add("deleteButton");
    task.appendChild(deleteButton);

    taskList.appendChild(task);

    taskInput.value = "";
    dateInput.value = "";
  }
}

function deleteOrCheck(e) {
  const item = e.target;

  if (item.classList[0] === "deleteButton") {
    const task = item.parentElement;
    task.classList.add("slide");

    removeTask(task);

    task.addEventListener("transitionend", function () {
      task.remove();
    });
  }

  if (item.classList[0] === "compliteButton") {
    const task = item.parentElement;
    task.classList.toggle("completed");

    markTask(task);
  }
}

function filterTasks(e) {
  const tasksArr = taskList.childNodes;

  tasksArr.forEach((task) => {
    switch (e.target.value) {
      case "all":
        task.style.display = "flex";
        break;
      case "completed":
        if (task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
      case "incomplete":
        if (!task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
    }
  });
}

function saveTask(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  const taskToDelete = task.children[0].children[0].innerText;
  tasks = tasks.filter((t) => t.task !== taskToDelete);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function markTask(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  const rightTask = task.children[0].children[0].innerText;
  const taskToMark = tasks.find((t) => t.task === rightTask);

  taskToMark.completed
    ? (taskToMark.completed = false)
    : (taskToMark.completed = true);

  removeTask(task);
  saveTask(taskToMark);
}

function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((t) => {
    const task = document.createElement("div");
    task.classList.add("task");

    t.completed && task.classList.add("completed");

    const taskData = document.createElement("div");
    taskData.classList.add("taskData");

    const taskDescr = document.createElement("li");
    taskDescr.innerText = t.task;
    taskDescr.classList.add("taskDescr");
    taskData.appendChild(taskDescr);

    const taskDeadline = document.createElement("div");
    taskDeadline.innerText = t.deadline;
    taskDeadline.classList.add("taskDeadline");
    taskData.appendChild(taskDeadline);

    task.appendChild(taskData);

    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    checkButton.classList.add("compliteButton");
    task.appendChild(checkButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></li>';
    deleteButton.classList.add("deleteButton");
    task.appendChild(deleteButton);

    taskList.appendChild(task);
  });
}

// localStorage.clear();
