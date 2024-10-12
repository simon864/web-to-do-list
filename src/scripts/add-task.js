const tasksContainer = document.querySelector(".tasks-container");
const addTuskButton = document.getElementById("add-task-button");
const inputTitle = document.getElementById("input-title");
const inputAbout = document.getElementById("input-about");
const zeroTaskContainer = document.querySelector(".zero-task-container");

function getTask() {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");

  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");

  const title = document.createElement("h2");
  title.textContent = inputTitle.value;
  textContainer.appendChild(title);

  const about = document.createElement("p");
  about.textContent = inputAbout.value;
  textContainer.appendChild(about);

  taskContainer.appendChild(textContainer);

  const deleteButtonContainer = document.createElement("div");
  deleteButtonContainer.classList.add("delete-button-container");

  const deleteTaskButton = document.createElement("button");
  deleteTaskButton.classList.add("delete-task-button");
  deleteButtonContainer.appendChild(deleteTaskButton);

  const imageCross = document.createElement("img");
  imageCross.src = "src/assets/images/cross-button.svg";
  deleteTaskButton.appendChild(imageCross);

  taskContainer.appendChild(deleteButtonContainer);

  tasksContainer.appendChild(taskContainer);

  zeroTaskContainer.style.display = "none";
}

function checkTask() {
  if (tasksContainer.children.length === 0) {
    zeroTaskContainer.style.display = "flex";
  }
}

addTuskButton.addEventListener("click", () => {
  if (inputTitle.value !== "") {
    checkTask();
    getTask();
    inputTitle.value = "";
    inputAbout.value = "";
  } else {
    alert("Введите заголовок!");
  }
});

tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-task-button")) {
    const taskContainer = event.target.parentElement.parentElement;
    deleteTask(taskContainer);
    checkTask();
  }
});

function deleteTask(taskContainer) {
  taskContainer.remove();
}
