AOS.init();
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

function addToDo() {
    event.preventDefault();
    const add = document.getElementById("todoInput").value;
    document.getElementById("todoInput").value = '';
    if (add == "") {
        return alert("Please Write Something!!!");
    }
    let now_id = Date.now();
    appendToLocalStorage('todos', now_id, add)
    createTodoElement(add, now_id);
}

function createTodoElement(add, id = '') {
    const mainSection = document.getElementById("mainSection");

    const parentDiv = document.createElement("div");
    parentDiv.setAttribute('id', id);
    parentDiv.setAttribute("data-status", "ondoing");
    parentDiv.classList.add("row", "g-3", "my-2");

    const divChild1 = document.createElement("div");
    divChild1.classList.add("col-12", "col-lg-9");
    const todoInfo = document.createElement("div");
    todoInfo.classList.add("alert", "alert-secondary", "mb-0");
    todoInfo.innerHTML = add;

    const divChild2 = document.createElement("div");
    divChild2.classList.add("col-12", "col-lg-3");
    const btnParent = document.createElement("div");
    btnParent.classList.add("d-flex", "justify-content-center", "align-items-center", "gap-1", "h-100");

    const btnDone = document.createElement("button");
    btnDone.classList.add("btn", "btn-success");
    btnDone.setAttribute("onclick", "doneTodo(" + id + ",this)");
    btnDone.innerHTML = "Done";

    const btnRemove = document.createElement("button");
    btnRemove.classList.add("btn", "btn-danger");
    btnRemove.setAttribute("onclick", "removeTodo(" + id + ")");
    btnRemove.innerHTML = "Remove";

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btn", "btn-info");
    btnEdit.setAttribute("onclick", "editTodo(" + id + ")");
    btnEdit.innerHTML = "Edit";

    mainSection.appendChild(parentDiv);
    parentDiv.appendChild(divChild1);
    parentDiv.appendChild(divChild2);

    divChild1.appendChild(todoInfo);

    divChild2.appendChild(btnParent);
    btnParent.appendChild(btnDone);
    btnParent.appendChild(btnRemove);
    btnParent.appendChild(btnEdit);
}

function removeTodo(id) {
    document.getElementById(id).remove();
    popFromLocalStorage('todos', id);
}

function doneTodo(id, btnElement) {
    const parentElement = document.getElementById(id);
    const doneTask = parentElement.children[0].children[0];
    doneTask.classList.remove("alert-secondary");
    doneTask.classList.add("alert-success", "text-decoration-line-through");
    parentElement.setAttribute("data-status", "done");
    btnElement.remove();
}

function editTodo(id) {
    const parentElement = document.getElementById(id);
    const editTask = parentElement.children[0].children[0];
    const inputCreate = document.createElement("input");
    inputCreate.classList.add("form-control", "my-2");
    inputCreate.value = editTask.innerHTML;
    editTask.replaceWith(inputCreate);
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

function appendToLocalStorage(itemName, newKey, newValue) {
    let data
    if (localStorage.getItem(itemName)) {
        data = localStorage.getItem(itemName);
        data = JSON.parse(data);
    } else {
        data = {};
    }
    data[newKey] = newValue;
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
