// selecionando dados

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

// funções

const mostrarTodos = () => {
  pegarTodos().forEach((todo) => {
    const todoElement = criarTodo(todo.id, todo.titulo, todo.feita);

    todoList.appendChild(todoElement);
  });
};

const addTodo = () => {
  const todos = pegarTodos();

  const todoObject = {
    id: gerarId(),
    titulo: todoInput.value,
    feita: false,
  };

  const todoElement = criarTodo(todoObject.id, todoObject.titulo);

  todoList.appendChild(todoElement);

  todos.push(todoObject);

  salvarTodos(todos);

  todoInput.value = "";
  // todoInput.focus();
};

const gerarId = () => {
  return Math.floor(Math.random() * 5000);
};

const criarTodo = (id, titulo, feita) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const tituloTodo = document.createElement("h3");
  tituloTodo.innerText = titulo;
  todo.appendChild(tituloTodo);

  const finalizarBtn = document.createElement("button");
  finalizarBtn.classList.add("finalizar-todo");
  finalizarBtn.innerHTML = '<i class="bi bi-check"></i>';
  todo.appendChild(finalizarBtn);

  const editarBtn = document.createElement("button");
  editarBtn.classList.add("editar-todo");
  editarBtn.innerHTML = '<i class="bi bi-pen"></i>';
  todo.appendChild(editarBtn);

  const deletarBtn = document.createElement("button");
  deletarBtn.classList.add("deletar-todo");
  deletarBtn.innerHTML = '<i class="bi bi-trash"></i>';
  todo.appendChild(deletarBtn);

  // eventos do todo

  todo.querySelector(".finalizar-todo").addEventListener("click", (e) => {
    const alvoElement = e.target;
    const paiElement = alvoElement.closest("div");

    paiElement.classList.toggle("feita");

    toggleConcluirTodo(id);
  });

  todo.querySelector(".deletar-todo").addEventListener("click", (e) => {
    const alvoElement = e.target;
    const paiElement = alvoElement.closest("div");

    paiElement.remove();

    removerTodo(id);
  });

  return todo;
};

// local storage

const pegarTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");

  return todos;
};

const salvarTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const toggleConcluirTodo = (id) => {
  const todos = pegarTodos();

  const todoAlvo = todos.filter((todo) => todo.id === id)[0];

  todoAlvo.feita = !todoAlvo.feita;

  salvarTodos(todos);
};

const removerTodo = (id) => {
  const todos = pegarTodos().filter((todo) => todo.id !== id);

  salvarTodos(todos);
};

// eventos

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

// inicialização

mostrarTodos();
