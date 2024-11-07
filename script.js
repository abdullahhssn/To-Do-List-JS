let form = document.getElementById("form");
let addnew = document.getElementById("addnew");
let textInput = document.getElementById("textInput");
let timeInput = document.getElementById("timeInput");
setCurrentTime();
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let todayBtn = document.getElementById("today-btn");
let tomBtn = document.getElementById("tom-btn");

let formValidation = () => {
  if (textInput.value === "") {
    msg.innerHTML = "Please Enter the title";
    console.log("Failure");
  } else {
    console.log("Success");
    acceptData();

    add.setAttribute("data-bs-dismiss", "modal");

    add.click(() => {
      add.setAttribute("data-bs-dismiss", "");
    });
  }
};

function setCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0"); // Ensures two-digit format
  const minutes = now.getMinutes().toString().padStart(2, "0");
  timeInput.value = `${hours}:${minutes}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

todayBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let today = new Date();
  dateInput.value = today.toISOString().split("T")[0];
  console.log(dateInput.value);
});

tomBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.value = tomorrow.toISOString().split("T")[0];
  console.log(dateInput.value);
});

let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    time: timeInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  createTasks();
  resetForm();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id="${y}">
  <span class="fw-bold">${x.text}</span>
  <span class="small fw-light">${x.time}</span>
  <span class="small fw-light">${x.date}</span>
  <span>${x.description}</span>
  <span class="options">
     <i 
     onclick="editTask(this)" 
      data-bs-toggle="modal"
      data-bs-target="#form"
      class="fa-regular fa-pen-to-square"
    ></i>
    <i onclick="deleteTask(this)" class="fa-solid fa-trash"></i>
  </span>
</div>
`);
  });
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(e.parentElement.parentElement.id);
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerHTML;
  timeInput.value = selectedTask.children[1].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  timeInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data"));
  createTasks();
  console.log(data);
})();
