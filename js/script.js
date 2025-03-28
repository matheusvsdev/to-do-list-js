// 01 - Seleção de elementos
const todoList = document.querySelector("#todo-list");
const addTask = document.querySelector("#todo-form");
const inputTask = document.querySelector("#todo-input");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseButton = document.querySelector("#erase-button");
const filterSelect = document.querySelector("#filter-select");

let oldInputValue;

// 02 - Funções

// Adicionando e salvando a nova tarefa
const saveTask = (text, done = 0, save = 1) => {
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

  // Utilizando dados da Local Storage
  if (done) {
    todo.classList.add("done");
  }

  if (save) {
    saveToDoLocalStorage({ text, done });
  }

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

// Função que edita o título da tarefa
const updateTodo = (editInputValue) => {
  // Selectiona todas as divs "todo"
  const todoAll = document.querySelectorAll(".todo");

  // Percorre por todos os títulos "h3" da div "todo"
  todoAll.forEach((todo) => {
    // Pega o título "h3"
    let todoTitle = todo.querySelector("h3");

    // Se o título for igual ao antigo
    if (todoTitle.innerText === oldInputValue) {
      // Ele atribui ao todoTitle
      todoTitle.innerText = editInputValue;
    }
  });
};

const getSearchTodo = (search) => {
  const todoAll = document.querySelectorAll(".todo");

  todoAll.forEach((todo) => {
    let title = todo.querySelector("h3").innerText.toLowerCase();

    const normalizedSearch = search.toLowerCase();

    todo.style.display = "flex";

    if (!title.includes(normalizedSearch)) {
      todo.style.display = "none";
    }
  });
};

const filterToDo = (filterValue) => {
  const todoAll = document.querySelectorAll(".todo");

  switch (filterValue) {
    case "all":
      todoAll.forEach((todo) => (todo.style.display = "flex"));
      break;
    case "done":
      todoAll.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;
    case "todo":
      todoAll.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;

    default:
      break;
  }
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

// Cria um evento de editar tarefa
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }
  toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value;
  getSearchTodo(search);
});

eraseButton.addEventListener("click", (e) => {
  e.preventDefault();

  searchInput.value = "";

  searchInput.dispatchEvent(new Event("keyup"));
});

// Evento que filtra as tasks de acordo com a opcao, chamando a funcao "filterToDo"
filterSelect.addEventListener("change", (e) => {
  const filterValue = e.target.value;

  filterToDo(filterValue);
});

const getToDosLocalStorage = () => {
  const todoAll = JSON.parse(localStorage.getItem("todoAll")) || [];

  return todoAll;
};

// Local Storage
const saveToDoLocalStorage = (todo) => {
  // Todos os To do da Local Storage
  const todoAll = getToDosLocalStorage();

  // Adicionar o novo To do no Array
  todoAll.push(todo);

  // Salvar tudo na Local Storage
  localStorage.setItem("todoAll", JSON.stringify(todoAll));
};
