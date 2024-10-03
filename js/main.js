let body =document.querySelector('body');
let btn =document.querySelector('#btn-mood');
let h1 =document.querySelector('.nav h1');
let addTask= document.querySelector('#addTask');
let layOut =document.querySelector('.layout');
let btnClose=document.querySelector('#btn-close');
let modal=document.querySelector('.modal-content');
let addTaskbtn=document.querySelector('#Add-close');
let modalh5=document.querySelector('.modal-content h5');
let card= document.querySelector('.card');
let cardBody=document.querySelector('.card-body')
let taskInput= document.querySelector('#taskInput');
let span= document.querySelector('span');
let EmptyTask= document.querySelector('#EmptyTask');
let layOut2 =document.querySelector('.layout2');
let deleteAll= document.querySelector('#deleteAll');
let hr= document.querySelector('hr');
let count=document.querySelector('.count');
let modal2 = document.getElementById('confirm-modal');
let p = document.querySelector('#confirm-modal p');
let overlay = document.getElementById('overlay');
let confirmDeleteAll = document.getElementById('confirm-delete-all');
let cancelDeleteAll = document.getElementById('cancel-delete-all');




btn.onclick= function(){
    if(btn.classList.contains("btn-light")){
      btn.classList.replace("btn-light","btn-dark");
      btn.innerHTML="Light Mood <i class=\"fa-regular fa-lightbulb\"></i>";
      h1.style.color='black';
      body.style.backgroundColor='black';
      addTask.classList.replace("blue","btn-secondary");
      modal.style.backgroundColor= "black";
      addTaskbtn.classList.replace('btn-primary','btn-secondary');
      modalh5.style.color='white';
      card.style.backgroundColor='black';
      hr.style.color='white';
      modal2.style.backgroundColor='black';
      p.style.color='white';
      count.style.color='white';
    } else{
      btn.classList.replace("btn-dark","btn-light")
      btn.innerHTML="Dark Mood <i class=\"fa-solid fa-moon\"></i>";
      h1.style.color='white';
      body.style.backgroundColor="rgb(126, 188, 240)";
      addTask.classList.replace("btn-secondary","blue")
      modal.style.backgroundColor= "white";
      addTaskbtn.classList.replace('btn-secondary','btn-primary');
      modalh5.style.color='black';
      card.style.backgroundColor='white';
      hr.style.color='black';
      modal2.style.backgroundColor='white';
      p.style.color='black';
      count.style.color='black';
    }
}
let showModal=() =>{
  layOut.classList.toggle('d-none')
}
addTask.addEventListener('click', showModal);
btnClose.addEventListener('click', showModal);

let Empty=()=>{
  if(cardBody.children.length == 0){
    EmptyTask.classList.remove('none');
    deleteAll.classList.add('none');
    count.classList.add('d-none');
  }else{
    EmptyTask.classList.add('none');
    deleteAll.classList.remove('none');
    count.classList.remove('d-none');
  }
}

let toTasks=()=>{
  let Inputvalue= taskInput.value;
  if(Inputvalue.trim()== ""){
    taskInput.classList.add('invalid');
    span.classList.remove('none');
    span.innerHTML=` You Must Enter Letters`
    taskInput.value= " ";
  }else if (taskInput.value.length<3){
    taskInput.classList.add('invalid');
    span.classList.remove('none');
    span.innerHTML=` You Must Enter At Least 3 Letters`
    taskInput.value= " ";
  }else if (taskInput.value.length > 20){
    taskInput.classList.add('invalid');
    span.classList.remove('none');
    span.innerHTML=` You Must Enter At Most 20 Letters`;
    taskInput.value= " ";
  }else{
  taskInput.classList.remove('invalid');
  span.classList.add('none');
  EmptyTask.classList.add('none');
  const alertClasses = ['alert-primary', 'alert-secondary', 'alert-success', 'alert-danger', 'alert-warning', 'alert-info', 'alert-light', 'alert-dark'];
  const randomIndex = Math.floor(Math.random() * alertClasses.length);
  cardBody.innerHTML+=`<div class="alert task ${alertClasses[randomIndex]}">${Inputvalue}
  <i class=" delete float-end fa-solid fa-eraser"></i></div>`;
  showModal();
  Empty();
  updateCounts();
  taskInput.value= " ";
}
}
addTaskbtn.addEventListener('click', toTasks);


document.addEventListener('click',function(event){
  if(event.target.classList.contains('delete')){
    event.target.parentElement.remove();
    Empty();
    updateCounts();
  }

});

deleteAll.addEventListener('click', function() {
  modal2.style.display = 'block';
  overlay.style.display = 'block';
});

confirmDeleteAll.addEventListener('click', function() {
  cardBody.innerHTML = " "; 
  Empty(); 
  modal2.style.display = 'none';
  overlay.style.display = 'none';
});
cancelDeleteAll.addEventListener('click', function() {
  modal2.style.display = 'none';
  overlay.style.display = 'none';
});

document.addEventListener('click',function(event){
  if(event.target.classList.contains('task')){
    event.target.classList.toggle('checked');
    Empty();
    updateCounts();
  }
});

document.addEventListener('click', function(event) {
if (event.target.classList.contains('task')) {
  event.target.classList.toggle('selected'); 
  updateCounts(); 
}
});


function updateCounts() {
  const allTasks = document.querySelectorAll('.task');
  const selectedTasks = document.querySelectorAll('.task.selected');

  const selectedCount = selectedTasks.length;
  const pendingCount = allTasks.length - selectedCount;

  document.querySelector('.count .selected').textContent = `Selected: ${selectedCount}`;
  document.querySelector('.count .pending').textContent = `Pending: ${pendingCount}`;
}

updateCounts();

function Empty2() {
  if (document.querySelectorAll('.task').length === 0) {
    document.querySelector('.count .selected').textContent = 'Selected: 0';
    document.querySelector('.count .pending').textContent = 'Pending: 0';
  }
}
