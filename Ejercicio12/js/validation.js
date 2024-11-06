// Función para validar URLs y endpoints del formulario
function validateForm() {
    const baseUrl = document.getElementById("baseUrl").value;
    const getEndpoint = document.getElementById("getEndpoint").value;
    const insertEndpoint = document.getElementById("insertEndpoint").value;
    const editEndpoint = document.getElementById("editEndpoint").value;
    const deleteEndpoint = document.getElementById("deleteEndpoint").value;

    // Expresión regular para validar formato de URL
    const patronURL = /^(https?:\/\/[\w.-]+(:\d+)?(\/[\w./-]*)?)$/;

    if (!patronURL.test(baseUrl)) {
        alert("La URL base no es válida.");
        return false;
    }

    // Validación básica para endpoints
    if (!getEndpoint.startsWith("/") || !insertEndpoint.startsWith("/") || 
        !editEndpoint.startsWith("/") || !deleteEndpoint.startsWith("/")) {
        alert("Los endpoints deben comenzar con '/'.");
        return false;
    }

    return true;
}
