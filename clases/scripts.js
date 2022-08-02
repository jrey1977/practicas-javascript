// Listados
listadoEstudiantes = [];
listadoProfesores = [];

// Otras cosas
let idsObjetos = 0;
const fragment = document.createDocumentFragment();

// Clases
class Persona {
    constructor(nombre, edad, tipo) {
        this.nombre = nombre;
        this.edad = edad;
        this.tipo = tipo;
        this.id = this.obtener_id();
    }
    obtener_id = function () {
        idsObjetos++;
        return idsObjetos;
    };
}

class Estudiante extends Persona {
    estado = "suspendido";

    cambiar_estado = function () {
        if (this.estado === "suspendido") {
            this.estado === "aprobado";
        } else {
            this.estado === "suspendido";
        }
    };
}

window.onload = function () {
    // Selectores

    // Botón agregar
    btnAgregar = document.getElementById("btnAgregar");

    // Formulario
    oForm = document.forms[0];

    // Plantilla Estudiante y Profesor
    const liEstudiante = document.querySelector("#liEstudiante");
    const estudiante = liEstudiante.cloneNode(true);
    const liProfesor = document.querySelector("#liProfesor");
    const profesor = liProfesor.cloneNode(true);

    // Listado Estudiantes y oprofesores
    const listadoEstudiantesSelector = document.querySelector(
        "#listadoEstudiantes"
    );
    const listadoProfesoresSelector =
        document.querySelector("#listadoProfesores");

    // Fragment: Réplica ligera del DOM
    const fragment = document.createDocumentFragment();

    // Funciones
    function meterObjeto(nombre, edad, tipoPersona, idPersona) {
        plantillaTipoPersona =
            "li" + (tipoPersona[0].toUpperCase() + tipoPersona.substring(1));
        console.log("plantillaTipoPersona", plantillaTipoPersona);
        const tipoPersonaSelector = document.querySelector(
            `#${plantillaTipoPersona}`
        );
        const clone = tipoPersonaSelector.content.cloneNode(true);
        console.log("clone", clone);
        clone.querySelector(".nombrePersona").textContent = nombre;
        clone.querySelector(".categoriaPersona").textContent = tipoPersona;
        clone.querySelector(".edadPersona").textContent = edad;
        clone.querySelector(".idPersona").value = idPersona;

        fragment.appendChild(clone);
        if (tipoPersona === "estudiante") {
            listadoEstudiantesSelector.appendChild(fragment);
        } else {
            listadoProfesoresSelector.appendChild(fragment);
        }
    }

    oForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Recogemos los valores del formulario
        let nombre = oForm.elements["nombre"].value;
        let edad = oForm.elements["edad"].value;
        let tipoPersona = oForm.elements["tipo"].value;
        if (tipoPersona === "estudiante") {
            let estudiante = new Estudiante(nombre, edad, tipoPersona);
            idPersona = estudiante.id;
            console.log("La id es ", idPersona);
            listadoEstudiantes.push(estudiante);
        } else {
            let profesor = new Persona(nombre, edad, tipoPersona);
            idPersona = profesor.id;
            console.log("La id es ", idPersona);
            listadoProfesores.push(profesor);
        }

        meterObjeto(nombre, edad, tipoPersona, idPersona);
        console.log("Listado de estudiantes:", listadoEstudiantes);
        console.log("Listado de profesores:", listadoProfesores);

        // TO DO: Meter elementos en listados
    });
};
