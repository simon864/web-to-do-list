const tasksContainer = document.querySelector(".tasks-container");
const addTuskButton = document.getElementById("add-task-button");
const inputTitle = document.getElementById("input-title");
const inputAbout = document.getElementById("input-about");

addTuskButton.onclick = function () {
  document.createElement("div");
  const title = inputTitle.value;
  const about = inputAbout.value;

  if (title && about) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `<div class="text-task-container"> <h2> ${title} </h2>
    <p> ${about} </p> </div>
    <div class = delete-task-button <button>
    <img src="src/assets/images/cross-button.svg" alt=""> </button> </div>`;

    const closeButton = task.querySelector(".delete-task-button");
    closeButton.addEventListener("click", () => {
      tasksContainer.removeChild(task);
    });

    tasksContainer.appendChild(task);
  } else {
    alert("Please enter both title and about");
  }
};
