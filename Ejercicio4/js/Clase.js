import { Alumno } from "./Alumno.js"; 

export class Clase {
    constructor() {
        this.alumnos = [
            new Alumno('Diana Pascual', 40, '2º DAW'),
            new Alumno('Javier Ortega', 19, '2º DAW'),
            new Alumno('Laura Padilla', 20, '2º DAW'),
            new Alumno('David Cuevas', 22, '2º DAW'),
            new Alumno('Enrique Díaz', 19, '2º DAW'),
            new Alumno('María Luna Garcia', 25, '2º DAW'),
            new Alumno('Alicia Hernandez', 21, '2º DAW'),
            new Alumno('Fernando Iglesias', 24, '2º DAW'),
            new Alumno('Hugo Jiménez', 21, '2º DAW'),
            new Alumno('José Antonio Muñoz', 37, '2º DAW'),
            new Alumno('Alejandro Navarro', 25, '2º DAW'),
            new Alumno('Juan Antonio', 23, '2º DAW'),
            new Alumno('Santiago Pérez', 21, '2º DAW'),
            new Alumno('José Pérez', 20, '2º DAW'),
            new Alumno('Javier Polo', 21, '2º DAW'),
            new Alumno('Miguel Ángel Reyes', 25, '2º DAW'),
            new Alumno('Iván Sánchez', 24, '2º DAW'),
            new Alumno('Sergio Velasco', 23, '2º DAW'),
            new Alumno('José Antonio Vázquez', 25, '2º DAW'),
            new Alumno('Fernando Vaquero', 25, '2º DAW'),
            new Alumno('José María Silva', 22, '2º DAW'),
            new Alumno('Samuel Jesús Ordóñez', 20, '2º DAW')
        ];

        this.alumnosGenerados = [];
    }
     
    // Método para obtener un alumno aleatorio no generado
  obtenerAlumnoAleatorio() {
    if (this.alumnosGenerados.length >= this.alumnos.length) {
      alert("No puedes generar más alumnos. Ya se han generado todos.");
      return null;
    }

    let alumno;
    do {
      const randomIndex = Math.floor(Math.random() * this.alumnos.length);
      alumno = this.alumnos[randomIndex];
    } while (this.alumnosGenerados.includes(alumno));

    this.alumnosGenerados.push(alumno);
    return alumno;
  }

  eliminarAlumnoGenerado(alumno) {
    const index = this.alumnosGenerados.indexOf(alumno);
      this.alumnosGenerados.splice(index, 1);
  
  }
}




