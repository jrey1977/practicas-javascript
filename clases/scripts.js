// Selectores
const formulario = document.getElementById("formulario");
const listadoEstudiantes = document.querySelector("#cardsEstudiantes");
const listadoProfesores = document.querySelector("#cardsProfesores");
const templateEstudiante =
    document.getElementById("templateEstudiante").content;
const templateProfesor = document.getElementById("templateProfesor").content;

// Arrays
const arrayEstudiantes = [];
const arrayProfesores = [];

// Delegación de eventos
document.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        if (e.target.matches(".btn-success")) {
            arrayEstudiantes.map((item) => {
                if (item.id === e.target.dataset.id) {
                    item.setEstado = true;
                }
                return item;
            });
        }

        if (e.target.matches(".btn-danger")) {
            arrayEstudiantes.map((item) => {
                if (item.id === e.target.dataset.id) {
                    item.setEstado = false;
                }
                return item;
            });
            const result = words.filter((word) => word.length > 6);
        }

        Persona.imprimirListados(arrayEstudiantes, "Estudiante");
    }
});

// Clases
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        this.id = `${Date.now()}`;
    }

    static imprimirListados(personas, tipo) {
        const fragment = document.createDocumentFragment();

        if (tipo === "Estudiante") {
            listadoEstudiantes.textContent = "";
            personas.forEach((item) => {
                console.log("Clone", item.agregarEstudiante());
                fragment.appendChild(item.agregarEstudiante());
            });

            listadoEstudiantes.appendChild(fragment);
        }
        if (tipo === "Profesor") {
            listadoProfesores.textContent = "";
            personas.forEach((profesor) => {
                fragment.appendChild(profesor.agregarProfesor());
            });

            listadoProfesores.appendChild(fragment);
        }
    }
}

class Estudiante extends Persona {
    #tipo = "Estudiante";
    #estado = false;

    get getTipo() {
        return this.#tipo;
    }

    /**
     * @param {boolean} estado
     */
    set setEstado(estado) {
        this.#estado = estado;
    }

    agregarEstudiante() {
        const clone = templateEstudiante.cloneNode(true);

        clone.querySelector(".text-primary").textContent = this.nombre;
        clone.querySelector(".badge").textContent = this.#estado
            ? "Aprobado"
            : "Suspendido";
        if (this.#estado) {
            clone.querySelector(".badge").className = "badge bg-success";
            clone.querySelector(".btn-success").disabled = true;
            clone.querySelector(".btn-danger").disabled = false;
        } else {
            clone.querySelector(".badge").className = "badge bg-danger";
            clone.querySelector(".btn-success").disabled = false;
            clone.querySelector(".btn-danger").disabled = true;
        }
        clone.querySelector("h6").textContent = this.getTipo;
        clone.querySelector(".lead").textContent = this.edad;
        clone.querySelector(".btn-success").dataset.id = this.id;
        clone.querySelector(".btn-danger").dataset.id = this.id;

        return clone;
    }
}

class Profesor extends Persona {
    #tipo = "Profesor";

    agregarProfesor() {
        const clone = templateProfesor.cloneNode(true);

        clone.querySelector("h5").textContent = this.nombre;
        clone.querySelector("h6").textContent = this.#tipo;
        clone.querySelector(".lead").textContent = this.edad;

        return clone;
    }
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const datos = new FormData(formulario);
    const [nombre, edad, opcion] = [...datos.values()];

    if (opcion === "Estudiante") {
        const estudiante = new Estudiante(nombre, edad);
        arrayEstudiantes.push(estudiante);
        console.log("arrayEstudiantes", arrayEstudiantes);
        Persona.imprimirListados(arrayEstudiantes, opcion);
    }

    if (opcion === "Profesor") {
        const profesor = new Profesor(nombre, edad);
        arrayProfesores.push(profesor);
        console.log("arrayProfesores", arrayProfesores);
        Persona.imprimirListados(arrayProfesores, opcion);
    }
});
