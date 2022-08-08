const form = document.querySelector("form");
const liTodo = document.getElementById("liTodo").content;
const listado = document.getElementById("listadoTodos");
let arrayTodos = [];

if (localStorage.getItem("todos")) {
    todos = localStorage.getItem("todos");
    console.log("Así recupero los todos: ", todos);
    // Convierto en array el string que se guarda en localStorage
    arrayTodos = JSON.parse(todos);
    console.log("arrayTodos recuperado es ", arrayTodos);
    pintaTodos(arrayTodos);
} else {
    console.log("No hay todos todavía");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevoTodo = document.querySelector(".nuevoTodo").value;
    let todo = {
        id: `${Date.now()}`,
        nombre: nuevoTodo,
    };
    arrayTodos.push(todo);
    // Convierto en string el array y lo guardo en localStorage
    localStorage.setItem("todos", JSON.stringify(arrayTodos));
    // Pinto los Todos actuyalizados
    pintaTodos(arrayTodos);
});

document.addEventListener("click", (e) => {
    if (e.target.matches(".btn-danger")) {
        let idTodo = e.target.dataset.id;
        console.log("Borro TODO con id ", idTodo);
        arrayTodos = arrayTodos.filter((item) => item.id !== idTodo);
        console.log("Así queda el array tras borrar:", arrayTodos);
        // Convierto en string el array y lo guardo en localStorage
        localStorage.setItem("todos", JSON.stringify(arrayTodos));
        pintaTodos(arrayTodos);
    }
});

function pintaTodos(arrayTodos) {
    console.log("todos array para pintar es ", arrayTodos);
    listado.textContent = "";
    const fragment = document.createDocumentFragment();
    arrayTodos.forEach((item) => {
        console.log("item es ", item);
        const liTodoTemplate = liTodo.cloneNode(true);
        liTodoTemplate.querySelector("p").textContent = item.nombre;
        liTodoTemplate.querySelector("button").dataset.id = item.id;
        fragment.appendChild(liTodoTemplate);
    });

    listado.appendChild(fragment);

    console.log("localStorage queda así: ", localStorage.getItem("todos"));
}
