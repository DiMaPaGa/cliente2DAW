document.getElementById("apiForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Validamos el formulario
    if (!validateForm()) {
        return; // Si la validación falla, no continuamos
    }
    
    // Obtenemos los valores de los campos del formulario
    const baseUrl = document.getElementById("baseUrl").value;
    const getEndpoint = document.getElementById("getEndpoint").value;
    const insertEndpoint = document.getElementById("insertEndpoint").value;
    const editEndpoint = document.getElementById("editEndpoint").value;
    const deleteEndpoint = document.getElementById("deleteEndpoint").value;

    // Guardar los endpoints en la URL para la siguiente página
    const params = new URLSearchParams({
        baseUrl,
        getEndpoint,
        insertEndpoint,
        editEndpoint,
        deleteEndpoint
    });

    window.location.href = `pages/paginaMuestra.html?${params.toString()}`;
});