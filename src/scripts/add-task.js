const tasksContainer = document.querySelector(".tasks-container");
const addTuskButton = document.getElementById("add-task-button");
const inputTitle = document.getElementById("input-title");
const inputAbout = document.getElementById("input-about");
const zeroTaskContainer = document.querySelector(".zero-task-container");
const body = document.getElementById("body");
const confirmationWindowContainer = document.querySelector(
  ".confirmation-window-container"
);
const modalBackdrop = document.querySelector(".modal-backdrop");
const windowButtonYes = document.querySelector(".window-button-yes");
const windowButtonNo = document.querySelector(".window-button-no");

//Locale storage
let taskCount = 0;

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach((task) => {
      createTaskElement(task.title, task.about, task.id);
    });
    taskCount = tasks.length;
  }
}

function saveTasks() {
  const tasks = [];
  const taskElements = tasksContainer.querySelectorAll(".task-main-container");
  taskElements.forEach((taskElement) => {
    const title = taskElement.querySelector("h2").textContent;
    const about = taskElement.querySelector("p").textContent;
    const id = taskElement.id;
    tasks.push({ title, about, id });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Создание задачи
function createTaskElement(title, about, taskId = null) {
  if (!taskId) {
    taskId = taskCount;
    taskCount++;
  }

  const taskMainContainer = document.createElement("div");
  taskMainContainer.classList.add("task-main-container");
  taskMainContainer.id = taskId;

  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  taskMainContainer.appendChild(taskContainer);

  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;
  textContainer.appendChild(titleElement);

  const aboutElement = document.createElement("p");
  aboutElement.textContent = about;
  textContainer.appendChild(aboutElement);

  taskContainer.appendChild(textContainer);

  const deleteButtonContainer = document.createElement("div");
  deleteButtonContainer.classList.add("delete-button-container");

  const deleteTaskButton = document.createElement("button");
  deleteTaskButton.classList.add("delete-task-button");
  deleteButtonContainer.appendChild(deleteTaskButton);

  const imageCross = document.createElement("img");
  imageCross.classList.add("cross-image");
  imageCross.src = "src/assets/images/cross-button.svg";
  deleteTaskButton.appendChild(imageCross);

  taskContainer.appendChild(deleteButtonContainer);

  tasksContainer.appendChild(taskMainContainer);

  zeroTaskContainer.style.display = "none";

  //Обработчик который вызывает модальное окно подтверждающее удаление задачи
  deleteTaskButton.addEventListener("click", (event) => {
    const taskToDelete = event.target.closest(".task-main-container");

    modalBackdrop.style.display = "flex";
    confirmationWindowContainer.style.display = "flex";

    //Обработчик который удаляет задачу
    windowButtonYes.addEventListener("click", () => {
      modalBackdrop.style.display = "none";
      confirmationWindowContainer.style.display = "none";

      if (taskToDelete && tasksContainer.contains(taskToDelete)) {
        tasksContainer.removeChild(taskToDelete);
        checkTask();
        saveTasks();
      }
    });
  });

  //Обработчик который удаляет подтверждающее модальное окно
  windowButtonNo.addEventListener("click", () => {
    modalBackdrop.style.display = "none";
    confirmationWindowContainer.style.display = "none";
  });

  //Обработчик который добавляет инструменты к задаче
  taskContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-task-button")) {
      return;
    }

    const clickedTaskMainContainer = event.currentTarget.closest(
      ".task-main-container"
    );

    if (clickedTaskMainContainer.querySelector(".tools-container")) {
      removeTools(clickedTaskMainContainer);
    } else {
      getTools(clickedTaskMainContainer);
    }
  });
}

//Создание интструментов
function getTools(taskMainContainer) {
  const toolsContainer = document.createElement("div");
  toolsContainer.classList.add("tools-container");
  taskMainContainer.appendChild(toolsContainer);

  const buttonShare = document.createElement("button");
  buttonShare.classList.add("button-share");
  toolsContainer.appendChild(buttonShare);

  const shareIcon = document.createElement("img");
  shareIcon.src = "src/assets/images/share-button.svg";
  buttonShare.appendChild(shareIcon);

  const buttonInfo = document.createElement("button");
  buttonInfo.classList.add("button-info");
  toolsContainer.appendChild(buttonInfo);

  const infoIcon = document.createElement("img");
  infoIcon.src = "src/assets/images/info-button.svg";
  buttonInfo.appendChild(infoIcon);

  const buttonEdit = document.createElement("button");
  buttonEdit.classList.add("button-edit");
  toolsContainer.appendChild(buttonEdit);

  const EditIcon = document.createElement("img");
  EditIcon.src = "src/assets/images/edit-button.svg";
  buttonEdit.appendChild(EditIcon);

  //Обработчик который добавляет модальное окно с редактированием задачи
  buttonEdit.addEventListener("click", (event) => {
    modalBackdrop.style.display = "flex";

    const currentTaskContainer = event.target.closest(".task-main-container");

    const editContainer = document.createElement("div");
    editContainer.classList.add("edit-container");
    body.appendChild(editContainer);

    const editFormContainer = document.createElement("div");
    editFormContainer.classList.add("edit-form-container");
    editContainer.appendChild(editFormContainer);

    const editInputContainer = document.createElement("div");
    editInputContainer.classList.add("edit-input-container");
    editFormContainer.appendChild(editInputContainer);

    const editButtonContainer = document.createElement("div");
    editButtonContainer.classList.add("edit-button-container");
    editFormContainer.appendChild(editButtonContainer);

    const miniInput = document.createElement("input");
    miniInput.classList.add("mini-input");
    miniInput.value = currentTaskContainer.querySelector("h2").textContent;
    editInputContainer.appendChild(miniInput);

    const maxInput = document.createElement("textarea");
    maxInput.classList.add("max-input");
    maxInput.value = currentTaskContainer.querySelector("p").textContent;
    editInputContainer.appendChild(maxInput);

    const editButtonCancel = document.createElement("button");
    editButtonCancel.classList.add("edit-button-cancel");
    editButtonCancel.textContent = "Cancel";
    editButtonContainer.appendChild(editButtonCancel);

    const editButtonSave = document.createElement("button");
    editButtonSave.classList.add("edit-button-save");
    editButtonSave.textContent = "Save";
    editButtonContainer.appendChild(editButtonSave);

    //Обработчик который удаляет модальное окно нажатием за границы модального окна
    modalBackdrop.addEventListener("click", () => {
      modalBackdrop.style.display = "none";
      hideModal(editContainer);
    });

    //Обработчик который удаляет модально окно нажатием на кнопку
    editButtonCancel.addEventListener("click", () => {
      modalBackdrop.style.display = "none";
      if (editContainer && body.contains(editContainer)) {
        body.removeChild(editContainer);
      }
    });

    //Обработчик который сохраняет изменения задачи
    editButtonSave.addEventListener("click", () => {
      const newTitle = miniInput.value;
      const newAbout = maxInput.value;

      const titleElement = currentTaskContainer.querySelector("h2");
      const aboutElement = currentTaskContainer.querySelector("p");

      if (newTitle === "" || newAbout === "") {
        alert("Введите заголовок и описание!");
        return;
      }

      titleElement.textContent = newTitle;
      aboutElement.textContent = newAbout;
      modalBackdrop.style.display = "none";
      if (editContainer && body.contains(editContainer)) {
        body.removeChild(editContainer);
      }
      saveTasks();
    });
  });

  //Обработчик который создаёт модальное окно с иконками поделится
  buttonShare.addEventListener("click", () => {
    modalBackdrop.style.display = "flex";

    const shareContainer = document.createElement("div");
    shareContainer.classList.add("share-container");
    body.appendChild(shareContainer);

    const shareIconContainer = document.createElement("div");
    shareIconContainer.classList.add("share-icon-container");
    shareContainer.appendChild(shareIconContainer);

    const copyIcon = document.createElement("img");
    copyIcon.src = "src/assets/images/copy-icon.svg";
    shareIconContainer.appendChild(copyIcon);

    const wkIcon = document.createElement("img");
    wkIcon.src = "src/assets/images/wk-icon.svg";
    shareIconContainer.appendChild(wkIcon);

    const telegramIcon = document.createElement("img");
    telegramIcon.src = "src/assets/images/telegram-icon.svg";
    shareIconContainer.appendChild(telegramIcon);

    const whatsAppIcon = document.createElement("img");
    whatsAppIcon.src = "src/assets/images/whats-app-icon.svg";
    shareIconContainer.appendChild(whatsAppIcon);

    const facebookIcon = document.createElement("img");
    facebookIcon.src = "src/assets/images/facebook-icon.svg";
    shareIconContainer.appendChild(facebookIcon);

    modalBackdrop.addEventListener("click", () => {
      modalBackdrop.style.display = "none";
      hideModal(shareContainer);
    });
  });
}

//Убирает инструменты
function removeTools(taskMainContainer) {
  const toolsContainer = taskMainContainer.querySelector(".tools-container");
  if (toolsContainer) {
    taskMainContainer.removeChild(toolsContainer);
  }
}

//Проверка не пуст ли список задач
function checkTask() {
  if (tasksContainer.children.length === 0) {
    zeroTaskContainer.style.display = "flex";
  }
}

//Обработчик который добавляет новую задачу
addTuskButton.addEventListener("click", () => {
  if (inputTitle.value !== "" && inputAbout.value !== "") {
    checkTask();
    createTaskElement(inputTitle.value, inputAbout.value);
    inputTitle.value = "";
    inputAbout.value = "";
    saveTasks();
  } else {
    alert("Введите заголовок и описание!");
  }
});

function hideModal(container) {
  modalBackdrop.style.display = "none";
  if (container && body.contains(container)) {
    body.removeChild(container);
  }
}

modalBackdrop.addEventListener("click", () => {
  modalBackdrop.style.display = "none";
  confirmationWindowContainer.style.display = "none";
});

//Загружаем таски из locale storage
loadTasks();
