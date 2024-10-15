// Listo las variables que voy a necesitar
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

// Cargar todos los event listeners
cargarEventListeners();
function cargarEventListeners() {
    // Agregar un curso al presionar "Agregar Al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo
        limpiarHTML(); // eliminamos todo el HTML
    });
}

// Funciones

// Función que añade el curso al carrito
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) { //Ojo, la clase borrar-curso ya está definida en el css para controlar su visionado.
        const cursoId = e.target.getAttribute('data-id');
 
        // Busca el curso en el carrito
        const curso = articulosCarrito.find(curso => curso.id === cursoId);

        // Si el curso existe y tiene más de una cantidad, disminuye la cantidad
        if (curso.cantidad > 1) {
            curso.cantidad--;
        } else {
            // Si el curso tiene 1 o menos, lo elimina del carrito
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        }

        // Actualiza el carrito y el HTML
         carritoHTML(); 

    }
}

// Lee los datos del curso seleccionado
function leerDatosCurso(curso) {
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('IMG').src,
        titulo: curso.querySelector('H4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('A').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            //Comprobamos si el elemento ya existe
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el curso actualizado sumándole 1 cantidad más.
            } else {
                return curso; // retorna el curso no duplicado
            }
        });
        // Actualizamos el carrito con una nueva copia del array
        articulosCarrito = [...cursos];
    } else {
        // Agrega elementos al array de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    // Llamamos a la funcion para mostrar el carrito de compras actualizado
    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('TR');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

// Elimina los cursos del tbody
function limpiarHTML() {
    // Forma lenta (la cambio por la otra)
    // contenedorCarrito.innerHTML = '';

    // Forma rápida (mejor rendimiento)
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
