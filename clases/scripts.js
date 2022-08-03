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
}

function cambiar_estado(estado) {
    if (estado === "suspendido") {
        return "aprobado";
    } else {
        return "suspendido";
    }
}

function cambiarEstado(e) {
    let id_persona = e.dataset.idPersona;
    document.getElementById("listadoEstudiantes").textContent = "";
    listadoEstudiantes.forEach((item, index) => {
        if (item.id == id_persona) {
            var nuevo_estado = cambiar_estado(listadoEstudiantes[index].estado);
            listadoEstudiantes[index].estado = nuevo_estado;
        }
        const listadoEstudiantesSelector2 = document.querySelector(
            "#listadoEstudiantes"
        );
        const liEstudiante2 = document.querySelector("#liEstudiante");
        const estudiante2 = liEstudiante2.cloneNode(true);
        const fragment2 = document.createDocumentFragment();
        const clone2 = liEstudiante2.content.cloneNode(true);
        clone2.querySelector(".nombrePersona").textContent = item.nombre;
        clone2.querySelector(".categoriaPersona").textContent = item.tipo;
        clone2.querySelector(".edadPersona").textContent = item.edad;
        clone2.querySelectorAll(".idPersona").forEach((boton, index) => {
            boton.dataset.idPersona = item.id;
        });
        clone2.querySelector(".estadoAlumno").textContent = item.estado;
        fragment2.appendChild(clone2);
        listadoEstudiantesSelector2.appendChild(fragment2);
    });
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

    // Botón aprobar y reprobar
    const botonAprobar = document.querySelectorAll(".btnAprobar");
    const botonSuspender = document.querySelectorAll(".btnSuspender");

    // Listado Estudiantes y profesores
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
        const tipoPersonaSelector = document.querySelector(
            `#${plantillaTipoPersona}`
        );
        const clone = tipoPersonaSelector.content.cloneNode(true);
        clone.querySelector(".nombrePersona").textContent = nombre;
        clone.querySelector(".categoriaPersona").textContent = tipoPersona;
        clone.querySelector(".edadPersona").textContent = edad;
        clone.querySelectorAll(".idPersona").forEach((boton, index) => {
            boton.dataset.idPersona = idPersona;
        });
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
            listadoEstudiantes.push(estudiante);
        } else {
            let profesor = new Persona(nombre, edad, tipoPersona);
            idPersona = profesor.id;
            listadoProfesores.push(profesor);
        }

        meterObjeto(nombre, edad, tipoPersona, idPersona);

        // TO DO: Meter elementos en listados
    });
};
