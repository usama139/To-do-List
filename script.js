const from = document.querySelector("#from");
const input_text = document.querySelector("#input_text");
const newtaskadd = document.querySelector(".newtaskadd");
const startedadd = document.querySelector(".startedadd");
const completedadd = document.querySelector(".completedadd");
const notask = document.querySelector(".notask");
const all_task = document.querySelector(".all_task");
const all_Heigh_priority = document.querySelector(".all_Heigh_priority");
const fromdate = document.querySelector("#date");
const priority = document.querySelector("#priority");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const renderTasks = () => {
  newtaskadd.innerHTML = "";
  startedadd.innerHTML = "";
  completedadd.innerHTML = "";
  
  let todoCount = 0;
  let highPriorityCount = 0;

  tasks.forEach((task, index) => {
    const newtask = document.createElement("div");
    newtask.classList.add("newtask");

    const newtask2 = document.createElement("div");
    newtask2.classList.add("newtask2");

    const date_priority = document.createElement("div");
    date_priority.classList.add("date_priority");

    const priorityshow = document.createElement("p");
    priorityshow.classList.add("priorityshow");
    priorityshow.innerText = task.priority;

    const newtasktext = document.createElement("input");
    newtasktext.classList.add("newtasktext");
    newtasktext.value = task.text;
    newtasktext.setAttribute("readonly", "readonly");

    const date = document.createElement("p");
    date.classList.add("date");
    date.innerText = `Due Date: ${task.date}`;

    const select = document.createElement("select");
    select.name = "priority";
    select.id = "priority1";

    const option1 = document.createElement("option");
    option1.value = "todo";
    option1.text = "To-do";

    const option2 = document.createElement("option");
    option2.value = "inprogress";
    option2.text = "Inprogress";

    const option3 = document.createElement("option");
    option3.value = "done";
    option3.text = "Done";

    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.value = task.status;

    const edit = document.createElement("button");
    edit.classList.add("edit");
    edit.innerHTML = "Edit";

    const deletbutton = document.createElement("button");
    deletbutton.classList.add("deletbutton");
    deletbutton.innerHTML = '<img src="./icon/trash.svg" alt="Delete"></img>';

    newtask.appendChild(date_priority);
    newtask2.appendChild(newtasktext);
    date_priority.appendChild(date);
    date_priority.appendChild(priorityshow);
    newtask2.appendChild(select);
    newtask2.appendChild(edit);
    newtask2.appendChild(deletbutton);
    newtask.appendChild(newtask2);

    if (task.status === "todo") {
      newtaskadd.appendChild(newtask);
      todoCount++;
      if (task.priority === "heigh") highPriorityCount++;
    } else if (task.status === "inprogress") {
      startedadd.appendChild(newtask);
    } else if (task.status === "done") {
      completedadd.appendChild(newtask);
    }

    edit.addEventListener("click", () => {
      if (edit.innerText == "Edit") {
        edit.innerText = "Save";
        newtasktext.removeAttribute("readonly");
        newtasktext.focus();
      } else {
        edit.innerText = "Edit";
        newtasktext.setAttribute("readonly", "readonly");
        tasks[index].text = newtasktext.value;
        saveToLocalStorage();
      }
    });

    deletbutton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveToLocalStorage();
      renderTasks();
    });

    select.addEventListener("change", () => {
      tasks[index].status = select.value;
      saveToLocalStorage();
      renderTasks();
    });
  });

  all_task.innerText = todoCount;
  all_Heigh_priority.innerText = highPriorityCount;

  notask.classList.toggle("none", tasks.length > 0);
};

const saveToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

from.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!input_text.value) {
    alert("Please input text");
    return;
  }

  const task = {
    text: input_text.value,
    date: fromdate.value,
    priority: priority.value,
    status: "todo",
  };

  tasks.push(task);
  saveToLocalStorage();
  renderTasks();

  input_text.value = "";
  fromdate.value = "";
});

document.addEventListener("DOMContentLoaded", renderTasks);
