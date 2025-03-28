// 01 - Seleção de elementos
const todoList = document.querySelector("#todo-list");
const addTask = document.querySelector("#todo-form");
const inputTask = document.querySelector("#todo-input");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

// 02 - Funções
const saveTask = (text) => {
  // Criando a div todo no HTML
  const todo = document.createElement("div");
  todo.classList.add("todo");

  // Criando h3
  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  // Colocando o h3 dentro da div
  todo.appendChild(todoTitle);

  // Criando botao de 'done'
  const doneButton = document.createElement("button");
  // Colocando classe no botao
  doneButton.classList.add("finish-todo");
  // Colocando ícone dentro do botao
  doneButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  // Colocando botao dentro da div 'todo'
  todo.appendChild(doneButton);

  // Criando botao de 'edit'
  const editButton = document.createElement("button");
  // Colocando classe no botao
  editButton.classList.add("edit-todo");
  // Colocando ícone dentro do botao
  editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
  // Colocando botao dentro da div 'todo'
  todo.appendChild(editButton);

  // Criando botao de cancelar
  const cancelButton = document.createElement("button");
  // Colocando classe no botao
  cancelButton.classList.add("finish-todo");
  // Colocando ícone dentro do botao
  cancelButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  // Colocando botao dentro da div 'todo'
  todo.appendChild(cancelButton);

  // Colocando a div 'todo' dentro da div 'todo-list'
  todoList.appendChild(todo);

  // Limpa o campoe de input quando adiciona a tarefa
  inputTask.value = "";

  // Quando adiciona a tarefa foca no input novamente
  inputTask.focus();
};

// 03 - Eventos

addTask.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = inputTask.value;

  if (inputValue) {
    saveTask(inputValue);
  }
});
