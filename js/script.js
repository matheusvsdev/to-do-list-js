// 01 - Seleção de elementos
const todoList = document.querySelector("#todo-list");
const addTask = document.querySelector("#todo-form");
const inputTask = document.querySelector("#todo-input");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// 02 - Funções

// Adicionando e salvando a nova tarefa
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

// Função para mudar formulário
// Adicionar tarefa ou remover
// Quando chamada, ela muda o estado de "hide" para "mostrar"
// ou de "mostrar" para "hide"
const toggleForms = () => {
  editForm.classList.toggle("hide"); // Esconde menu de opções
  addTask.classList.toggle("hide"); // Esconde formulário de adicionar tarefa
  todoList.classList.toggle("hide"); // Esconde a lista de tarefas
};

const updateTodo = (editInputValue) => {
  const todoAll = document.querySelectorAll(".todo");

  todoAll.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = editInputValue;
    }
  });
};

// 03 - Eventos

// Evento de guardar valor digitado no input, clicar no botão de adicionar e salvar tarefa
addTask.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = inputTask.value;

  if (inputValue) {
    saveTask(inputValue);
  }
});

// Evento de marcar ações nas tarefas
document.addEventListener("click", (e) => {
  // Busca o botão(elemento) que foi clicado
  const targetElement = e.target;

  // Dentro da div "pai"
  const parentElement = targetElement.closest("div");

  let taskTitle;

  if (parentElement && parentElement.querySelector("h3")) {
    taskTitle = parentElement.querySelector("h3").innerText;
  }

  // Pega o botão de confirmar tarefa
  if (targetElement.classList.contains("finish-todo")) {
    // Ativa ele para concluída (done)
    parentElement.classList.toggle("done"); // "toggle" ativa e desativa clicando, diferente do "add"
  }

  // Pega o botão de editar tarefa
  if (targetElement.classList.contains("edit-todo")) {
    // Chama a função de editar tarefa
    toggleForms();

    // Atribui o valor do campo de edição para o novo título da tarefa
    editInput.value = taskTitle;

    // Puxa o valor antigo do título para apresentar no campo de edição do título da tarefa
    oldInputValue = taskTitle;
  }

  // Pega o botão de remover tarefa
  if (targetElement.classList.contains("remove-todo")) {
    parentElement.remove();
  }
});

// Cria evento para botão CANCELAR
cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Chama a função para alterar o que tiver escondido para mostrar e o que tiver a mostra para esconder
  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }
  toggleForms();
});
