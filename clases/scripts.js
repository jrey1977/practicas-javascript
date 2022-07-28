// Listados
listadoEstudiantes = [];
listadoProfesores = [];

// Clases
class Persona {
    constructor(nombre, edad, tipo) {
        this.nombre = nombre;
        this.edad = edad;
        this.tipo = tipo;
    }
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
    btnAgregar = document.getElementById("btnAgregar");
    oForm = document.forms[0];

    // Funciones
    oForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Recogemos los valores del formulario
        let nombre = oForm.elements["nombre"].value;
        let edad = oForm.elements["edad"].value;
        let tipoPersona = oForm.elements["tipo"].value;
        if (tipoPersona === "estudiante") {
            let estudiante = new Estudiante(nombre, edad, tipoPersona);
            listadoEstudiantes.push(estudiante);
        } else {
            let profesor = new Persona(nombre, edad, tipoPersona);
            listadoProfesores.push(profesor);
        }
        console.log("Listado de estudiantes:", listadoEstudiantes);
        console.log("Listado de profesores:", listadoProfesores);
    });
};
