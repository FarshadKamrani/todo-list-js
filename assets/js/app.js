const mode = document.documentElement;
function modeChange() {
    let themeIcon = document.getElementById("modeChangeIcon");
    if (mode.hasAttribute("data-bs-theme")) {
        mode.removeAttribute("data-bs-theme");
        localStorage.setItem("theme", "white");
        themeIcon.classList.remove("fa-sun", "text-warning");
        themeIcon.classList.add("fa-moon", "text-dark");
    } else {
        mode.setAttribute("data-bs-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeIcon.classList.remove("fa-moon", "text-dark");
        themeIcon.classList.add("fa-sun", "text-warning");
    };
}
let saveTheme = localStorage.getItem("theme");
if (saveTheme == "dark") {
    let themeIcon = document.getElementById("modeChangeIcon");
    mode.setAttribute("data-bs-theme", "dark");
    themeIcon.classList.remove("fa-moon", "text-dark");
    themeIcon.classList.add("fa-sun", "text-warning");
}

function clockRunner() {
    let time = new Date();
    let hour = time.getHours();
    let minutes = time.getMinutes();
    let second = time.getSeconds();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (second < 10) {
        second = "0" + second;
    }
    let clock = hour + ":" + minutes + ":" + second;
    document.getElementById('MyClockDisplay').textContent = clock;
    setTimeout(clockRunner, 1000)

}
clockRunner();
function showCalendar() {
    let todayDate = new Date();
    let year = todayDate.getFullYear();
    let month = todayDate.getUTCMonth() + 1;
    let day = todayDate.getDate();
    if (month == 1) {
        month = "Jan";
    } else if (month == 2) {
        month = "Feb";

    } else if (month == 3) {
        month = "Mar";

    } else if (month == 4) {
        month = "Apr";

    } else if (month == 5) {
        month = "May";
    } else if (month == 6) {
        month = "Jun";

    } else if (month == 7) {
        month = "Jul";

    } else if (month == 8) {
        month = "Aug";

    } else if (month == 9) {
        month = "Sep";

    } else if (month == 10) {
        month = "Oct";

    } else if (month == 11) {
        month = "Nov";

    } else if (month == 12) {
        month = "Dec";
    }
    let myCalendar = month + " " + day + "," + " " + year;
    document.getElementById('MyCalendarDisplay').textContent = myCalendar;


}
showCalendar();


function addToDo() {
    event.preventDefault();
    const add = document.getElementById("todoInput").value;
    document.getElementById("todoInput").value = '';
    if (add == "" || add.length < 3) {
        return alert("Please Write Something!!!");
    }
    let now_id = Date.now();
    appendToLocalStorage('todos', now_id, add)
    createTodoElement(add, now_id);
}

function createTodoElement(todo, id = '') {//todo = object status & todo text
    const mainSection = document.getElementById("mainSection");

    let todoText = todo;
    let todoStatus = 'ondoing';
    if (typeof todo === 'object') {
        todoText = todo.todoText;
        todoStatus = todo.status;
    }

    const parentDiv = document.createElement("div");
    parentDiv.setAttribute('id', id);
    parentDiv.setAttribute("data-status", todoStatus);
    parentDiv.classList.add("row", "g-3", "my-2");

    const divChild1 = document.createElement("div");
    divChild1.classList.add("col-12", "col-lg-9");
    const todoInfo = document.createElement("div");
    let todoBoxColor;
    if (todoStatus === 'ondoing') {
        todoBoxColor = ["alert-info"]
    } else {
        todoBoxColor = ["alert-success", "text-decoration-line-through"]
    }
    todoInfo.classList.add("alert", ...todoBoxColor, "mb-0");
    todoInfo.innerHTML = todoText;


    const divChild2 = document.createElement("div");
    divChild2.classList.add("col-12", "col-lg-3");
    const btnParent = document.createElement("div");
    btnParent.classList.add("d-flex", "justify-content-center", "align-items-center", "gap-1", "h-100");


    const btnDone = document.createElement("input");
    btnDone.setAttribute("type", "checkbox");
    btnDone.classList.add("btn-check");
    btnDone.setAttribute("id", (Math.floor(id / 1000)));  // "bd_"+id
    btnDone.setAttribute("onclick", "doneTodo(" + id + ")");

    const btnDoneLabel = document.createElement("label");
    btnDoneLabel.setAttribute("for", (Math.floor(id / 1000)));
    let btnDoneClass, btnDoneIcon;
    if (todoStatus === 'ondoing') {
        btnDoneClass = "btn-outline-success";
        btnDoneIcon = '<i class="fas fa-check-double fa-lg"></i>'
    } else {
        btnDone.setAttribute("checked", "");
        btnDoneClass = "btn-outline-warning";
        btnDoneIcon = '<i class="fas fa-check fa-lg"></i>'
    }
    btnDoneLabel.classList.add("btn", btnDoneClass);
    btnDoneLabel.innerHTML = btnDoneIcon;



    const btnRemove = document.createElement("button");
    btnRemove.classList.add("btn", "btn-outline-danger");
    btnRemove.setAttribute("onclick", "removeTodo(" + id + ")");
    btnRemove.innerHTML = `<i class="fas fa-trash-alt fa-lg"></i>`;

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btn", "btn-outline-info");
    btnEdit.setAttribute("onclick", "editTodo(" + id + ")");
    btnEdit.innerHTML = `<i class="fas fa-pencil-alt fa-lg"></i>`;

    mainSection.appendChild(parentDiv);
    parentDiv.appendChild(divChild1);
    parentDiv.appendChild(divChild2);

    divChild1.appendChild(todoInfo);

    divChild2.appendChild(btnParent);
    btnParent.appendChild(btnDone);
    btnParent.appendChild(btnDoneLabel);
    btnParent.appendChild(btnRemove);
    btnParent.appendChild(btnEdit);
}

function removeTodo(id) {
    document.getElementById(id).remove();
    popFromLocalStorage('todos', id);
}


function doneTodo(id) {
    let checkboxDone = document.getElementById((Math.floor(id / 1000)));
    let checkboxDoneName = document.getElementById((Math.floor(id / 1000))).nextSibling;
    const parentElement = document.getElementById(id);
    const doneTask = parentElement.children[0].children[0];

    if (!checkboxDone.hasAttribute("checked")) {
        checkboxDone.setAttribute("checked", "");
        doneTask.classList.remove("alert-info");
        doneTask.classList.add("alert-success", "text-decoration-line-through");
        parentElement.setAttribute("data-status", "done");
        checkboxDoneName.innerHTML = `<i class="fas fa-check fa-lg"></i>`;
        checkboxDoneName.classList.remove("btn-outline-success")
        checkboxDoneName.classList.add("btn-outline-warning")
    } else {
        checkboxDone.removeAttribute("checked");
        doneTask.classList.add("alert-info");
        doneTask.classList.remove("alert-success", "text-decoration-line-through");
        parentElement.setAttribute("data-status", "ondoing");
        checkboxDoneName.innerHTML = `<i class="fas fa-check-double fa-lg"></i>`;
        checkboxDoneName.classList.add("btn-outline-success");
        checkboxDoneName.classList.remove("btn-outline-warning");

    }
    doneLocalStorage(id)
}



function editTodo(id) {
    const parentElement = document.getElementById(id);
    const editTask = parentElement.children[0].children[0];
    const inputCreate = document.createElement("input");
    inputCreate.classList.add("form-control", "form-control-lg", "my-2");
    inputCreate.value = editTask.innerHTML;
    editTask.replaceWith(inputCreate);
    inputCreate.setAttribute("onkeyup", "editTodoText(event," + id + ")");
}

function editTodoText(event, id) {
    const parentElement = document.getElementById(id);
    const editTask = parentElement.children[0].children[0];
    const divCreate = document.createElement("div");
    divCreate.classList.add("alert", "alert-info", "mb-0");
    divCreate.textContent = editTask.value
    if (event.keyCode === 13) {
        let editedValue = editTask.value;
        if (editedValue == "" || editedValue.length < 3) {
            return alert("please write something!!!")
        }
        editTask.replaceWith(divCreate);
        editLocalStorage(id, editTask.value)
    }

}


function filterTodo(requested) { //done || on_doing || all
    const finishedTasks = document.getElementById("mainSection").children;
    for (let i = 0; finishedTasks.length > i; i++) {
        if (requested == "all") {
            finishedTasks[i].classList.remove("d-none");
        } else {
            if (finishedTasks[i].getAttribute("data-status") == requested) {
                finishedTasks[i].classList.remove("d-none");
            } else {
                finishedTasks[i].classList.add("d-none");
            }
        }
    }

}

function doneLocalStorage(id) {
    if (localStorage.getItem("todos")) {
        let data = localStorage.getItem("todos");
        data = JSON.parse(data);
        if (data[id]) {
            if (data[id]["status"] == "ondoing") {
                data[id]["status"] = "done";
            } else {
                data[id]["status"] = "ondoing";
            }
            data = JSON.stringify(data);
            localStorage.setItem("todos", data);

        }
    }
}

function editLocalStorage(id, newText) {
    if (localStorage.getItem("todos")) {
        let data = localStorage.getItem("todos");
        data = JSON.parse(data);
        if (data[id]) {
            data[id]["todoText"] = newText;
            data = JSON.stringify(data);
            localStorage.setItem("todos", data);
        }
    }
}

function appendToLocalStorage(itemName, newKey, todoText) {
    let data
    if (localStorage.getItem(itemName)) {
        data = localStorage.getItem(itemName);
        data = JSON.parse(data);
    } else {
        data = {};
    }
    data[newKey] = {
        status: "ondoing",
        todoText: todoText,
    };
    data = JSON.stringify(data);
    localStorage.setItem(itemName, data);
}

function popFromLocalStorage(itemName, keyToRemove) {
    let data
    if (localStorage.getItem(itemName)) {
        data = localStorage.getItem(itemName);
        data = JSON.parse(data);
        delete data[keyToRemove]
        data = JSON.stringify(data);
        localStorage.setItem(itemName, data);
    }
}

if (localStorage.getItem('todos')) {
    let data = localStorage.getItem('todos');
    data = JSON.parse(data);

    for (const [key, value] of Object.entries(data)) {
        createTodoElement(value, key);
    }
}
