// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// load all eventlisteners

loadEventListeners();

function loadEventListeners(){
   // add task form

   document.addEventListener('DOMContentLoaded', getTasks);

   form.addEventListener('submit', addTask);
   taskList.addEventListener('click', removeTask);
   // clear tasks
   clearBtn.addEventListener('click', clearTasks);

   //filter tasks
   filter.addEventListener('click', filterTasks);
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }else{
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){

    const li = document.createElement('li');
    li.className = 'collection-item';

    li.appendChild(document.createTextNode(task));
    
    // create new link
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"</i>'

    //append the link to li
    li.appendChild(link);
    taskList.appendChild(li);

    });

}

// Add task
function addTask(e){
    if(taskInput.value ===''){
        alert('hello');
    }

    const li = document.createElement('li');
    li.className = 'collection-item';

    li.appendChild(document.createTextNode(taskInput.value));
    
    // create new link
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"</i>'

    //append the link to li
    li.appendChild(link);
    taskList.appendChild(li);

    // store in LS
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value ='';
    

    e.preventDefault();
}


function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }else{
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are u sure?')){
            e.target.parentElement.parentElement.remove();

            removeTasksFromLocalStorage(e.target.parentElement.parentElement);
        }
      

    }
  
}

function removeTasksFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }else{
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function clearTasks(){
    // taskList.innerHTML ="";

    // another faster method to remove all elements using while loop
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();

}

// clear all from local storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text= e.target.value.toLowerCase();
    console.log(text);

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display= 'block';

        }else{
            task.style.display ='none';
        }
    });
}