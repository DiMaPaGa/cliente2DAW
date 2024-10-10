const formulario = document.querySelector("#formulario");

// Añadimos eventos 'blur' para los inputs del formulario
formulario.querySelector('#asunto').addEventListener('blur', validarAsunto);
formulario.querySelector('#cc').addEventListener('blur', validarCC);
formulario.querySelector('#mensaje').addEventListener('blur', validarMensaje);

// Evitar el envío del formulario para pruebas
formulario.addEventListener('submit', function (e) {
    e.preventDefault(); // Previene el envío para pruebas
});

function validarAsunto() {
    const asunto = formulario.querySelector('#asunto');
    const error = formulario.querySelector('#asuntoError');
    
    if (asunto.value.trim() === '') {
        mostrarError(asunto, error, 'El asunto no puede estar vacío.');
    } else {
        mostrarExito(asunto, error);
    }
}

function validarCC() {
    const cc = formulario.querySelector('#cc');
    const error = formulario.querySelector('#ccError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(cc.value.trim())) {
        mostrarError(cc, error, 'Por favor, introduce un correo electrónico válido.');
    } else {
        mostrarExito(cc, error);
    }
}

function validarMensaje() {
    const mensaje = formulario.querySelector('#mensaje');
    const error = formulario.querySelector('#mensajeError');

    if (mensaje.value.trim() === '') {
        mostrarError(mensaje, error, 'El mensaje no puede estar vacío.');
    } else {
        mostrarExito(mensaje, error);
    }
}

function mostrarError(input, error, mensaje) {
    input.classList.remove('valido');
    input.classList.add('invalido');
    error.textContent = mensaje;
    error.style.display = 'block'; // Mostrar el mensaje de error
}

function mostrarExito(input, error) {
    input.classList.remove('invalido');
    input.classList.add('valido');
    error.textContent = ''; // Limpiar el mensaje de error
    error.style.display = 'none'; // Ocultar el mensaje de error
}
