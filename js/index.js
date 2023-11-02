const $input = document.querySelector(`.input-tarea`);
const $form = document.querySelector(`form`);
const $ul = document.querySelector(`.lista-tareas`)
const deleteAllBtn = document.querySelector(".deleteAll-btn");

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

const saveLocalStorage = () =>{
    localStorage.setItem(`tasks`, JSON.stringify(taskList));
}

const createTask = (task) => {
    const {name, id} = task;

    return `<li>${name}<img class="delete-btn" src="../assets/delete.svg" alt="boton de borrar" data-id="${id}"></li>`
}

const renderTaskList = () =>{
    $ul.innerHTML = taskList.map((task)=> createTask(task)).join(``);
}

const toggleDeleteAllBtn=()=>{
    if (!taskList.length){
        deleteAllBtn.classList.add(`hidden`)
        return
    }
    deleteAllBtn.classList.remove(`hidden`)
}

const correctInputValue=() =>{
    return $input.value.trim();
}

const isValidTask = (taskName) =>{
    let isValid = true;
    if(taskName.length == 0){
        alert(`Debe ingresar una tarea`)
        isValid=false;
    }
    else if(taskList.some((task)=> task.name.toLowerCase()=== taskName.toLowerCase())){
        alert(`Esta tarea ya existe en la lista.`);
        isValid= false;
    }
    return isValid;
}

const addTask = (e) =>{
    e.preventDefault();
    const taskName = correctInputValue();

    if(isValidTask(taskName)){
        taskList = [...taskList, {name:taskName, id: Date.now()}]
        $form.reset();
        renderTaskList();
        saveLocalStorage();
        toggleDeleteAllBtn();
    }
}

const removeTask = (e) =>{
    if(!e.target.classList.contains(`delete-btn`)){
        return;
    }

    const filterId= Number(e.target.dataset.id);

    taskList = taskList.filter((task) => task.id !== filterId);
    renderTaskList();
    saveLocalStorage();
    toggleDeleteAllBtn();
}

const removeAll =()=> {
    taskList = []
    renderTaskList();
    saveLocalStorage();
    toggleDeleteAllBtn();
}

const init = () =>{
    document.addEventListener(`DOMContentLoaded`, renderTaskList);
    $form.addEventListener(`submit`, addTask);
    $ul.addEventListener(`click`, removeTask);
    deleteAllBtn.addEventListener(`click`, removeAll);
    document.addEventListener(`DOMContentLoaded`, toggleDeleteAllBtn)
}

init();