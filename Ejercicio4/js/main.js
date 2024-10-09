
import { Clase } from "./Clase.js";


  
  // Variables globales
  const claseDAW = new Clase();
  const container = document.querySelector('#container');
  const generateBtn = document.querySelector('#generate-btn');

  function generarAlumnoAleatorio() {
  const alumno = claseDAW.obtenerAlumnoAleatorio();
    if (alumno) {
      crearCarta(alumno);
    }
  }

  function crearCarta(alumno) {
    const card = document.createElement('DIV');
    card.classList.add('card');

    const nombreElem = document.createElement('P');
    nombreElem.textContent = `Nombre: ${alumno.nombre}`;
    const edadElem = document.createElement('P');
    edadElem.textContent = `Edad: ${alumno.edad}`;
    const cursoElem = document.createElement('P');
    cursoElem.textContent = `Curso: ${alumno.curso}`;

    const deleteBtn = document.createElement('BUTTON');
    deleteBtn.textContent = "Borrar";
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function () {
      container.removeChild(card);
      claseDAW.eliminarAlumnoGenerado(alumno);
    };

    card.appendChild(nombreElem);
    card.appendChild(edadElem);
    card.appendChild(cursoElem);
    card.appendChild(deleteBtn);

    container.appendChild(card);
  }

  generateBtn.addEventListener('click', generarAlumnoAleatorio);