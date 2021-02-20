const toDoForm = document.querySelector(".js-todo-form"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".js-pending"),
  finishedList = document.querySelector(".js-finished");

let pendingTasks, finishedTasks;

const PENDING = "PENDING";
const FINISHED = "FINISHED";

function createObj(value) {
  return {
    id: String(Date.now()),
    text: value
  };
}

function taskInPending(taskId) {
  return pendingTasks.find(function (task) {
    return task.id === taskId;
  });
}

function taskInFinished(taskId) {
  return finishedTasks.find(function (task) {
    return task.id === taskId;
  });
}

function removePending(taskId) {
  pendingTasks = pendingTasks.filter(function (task) {
    return task.id !== taskId;
  });
}

function removeFinished(taskId) {
  finishedTasks = finishedTasks.filter(function (task) {
    return task.id !== taskId;
  });
}

function deleteToDo(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  removeFinished(li.id);
  removePending(li.id);
  saveState();
  console.log(pendingTasks, finishedTasks);
}

function handleBtn(event) {
  if (event.target.innerText === "✔") {
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.appendChild(li);
    btn.innerText = "⏮";
    const task = taskInPending(li.id);
    removePending(li.id);
    finishedTasks.push(task);
    saveState();
    console.log(pendingTasks, finishedTasks);
  } else if (event.target.innerText === "⏮") {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.appendChild(li);
    btn.innerText = "✔";
    const task = taskInFinished(li.id);
    removeFinished(li.id);
    pendingTasks.push(task);
    saveState();
    console.log(pendingTasks, finishedTasks);
  }
}

function pendingToDO(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  span.innerText = task.text;
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteToDo);
  checkBtn.innerText = "✔";
  checkBtn.addEventListener("click", handleBtn);
  li.append(span,checkBtn,  deleteBtn);
  li.id = task.id;
  pendingList.append(li);
  console.log(pendingTasks, finishedTasks);
}

function saveState() {
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}

function loadState() {
  pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
  finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

function restoreState() {
  pendingTasks.forEach(function (task) {
    pendingToDO(task);
  });
  finishedTasks.forEach(function (task) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    span.innerText = task.text;
    deleteBtn.innerText = "❌";
    deleteBtn.addEventListener("click", deleteToDo);
    checkBtn.innerText = "⏮";
    checkBtn.addEventListener("click", handleBtn);
    li.append(span, deleteBtn, checkBtn);
    li.id = task.id;
    finishedList.appendChild(li);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const task = createObj(toDoInput.value);
  pendingToDO(task);
  pendingTasks.push(task);
  toDoInput.value = "";
  saveState();
}

function init() {
  toDoForm.addEventListener("submit", handleSubmit);
  loadState();
  restoreState();
  console.log(pendingTasks, finishedTasks);
}

init();
