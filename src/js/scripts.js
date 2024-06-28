// selecionando elementos

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const buscaContainer = document.querySelector("#busca-container");
const filtroContainer = document.querySelector("#filtro-container");
const todoList = document.querySelector("#todo-list");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const buscarInput = document.querySelector("#buscar-input");
const filtroSelect = document.querySelector("#filtro-select");

let oldIdValue;

// funções

const mostrarTodos = () => {
  limparTodos();

  pegarTodos().forEach((todo) => {
    const todoElement = criarTodo(todo.id, todo.titulo, todo.feita);

    todoList.appendChild(todoElement);
  });
};

const limparTodos = () => {
  todoList.replaceChildren([]);
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
  todoInput.focus();
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

  if (feita) {
    todo.classList.add("feita");
  }

  // eventos do todo

  todo.querySelector(".finalizar-todo").addEventListener("click", (e) => {
    const alvoElement = e.target;
    const paiElement = alvoElement.closest("div");

    paiElement.classList.toggle("feita");

    toggleConcluirTodo(id);
  });

  todo.querySelector(".editar-todo").addEventListener("click", (e) => {
    esconderForms();

    editInput.value = titulo;
    oldIdValue = id;
  });

  todo.querySelector(".deletar-todo").addEventListener("click", (e) => {
    const alvoElement = e.target;
    const paiElement = alvoElement.closest("div");

    paiElement.remove();

    removerTodo(id);
  });

  return todo;
};

const esconderForms = () => {
  todoForm.classList.toggle("hide");
  editForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const atualizarTodo = (id, titulo) => {
  const todos = pegarTodos();

  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.titulo = titulo;
    }
  });

  salvarTodos(todos);

  mostrarTodos();
};

const buscarTodos = (busca) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let tituloTodo = todo.querySelector("h3").innerText.toLowerCase();

    const buscaNormalizada = busca.toLowerCase();

    todo.style.display = "flex";

    if (!tituloTodo.includes(buscaNormalizada)) {
      todo.style.display = "none";
    }
  });
};

// const filtrarTodos = (valorFiltro) => {
//   const todos = pegarTodos();

//   switch (valorFiltro) {
//     case "Todas":
//       todos.forEach((todo) => (todo.style.display = "flex"));
//       break;

//     case "Feitas":
//       todos.forEach((todo) =>
//         todo.feita
//           ? (todo.style.display = "flex")
//           : (todo.style.display = "none")
//       );
//       break;

//     default:
//       break;
//   }
// };

// local storage

const pegarTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");

  return todos;
};

const salvarTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const toggleConcluirTodo = (id, feita) => {
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

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    atualizarTodo(oldIdValue, editInputValue);
  }

  esconderForms();
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  esconderForms();
});

buscarInput.addEventListener("keyup", (e) => {
  const busca = e.target.value;

  buscarTodos(busca);
});

filtroSelect.addEventListener("change", (e) => {
  const valorFiltro = e.target.value;

  filtrarTodos(valorFiltro);
});

// inicialização

mostrarTodos();
