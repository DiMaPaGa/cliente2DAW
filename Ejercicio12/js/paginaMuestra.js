
let dataStructure = {}; // Estructura de los datos obtenida de la API

// Detección de tipos de datos para manejar Integer, Long, Float y Double
function inferType(value) {
    if (typeof value === 'number') {
        // Si el valor es un número entero pero no cabe en un entero regular (por ejemplo, más de 2^53-1), se trata como Long
        if (Number.isInteger(value)) {
            if (Math.abs(value) > Number.MAX_SAFE_INTEGER) {
                return 'long';  // Detectamos si el número es demasiado grande para ser un entero normal
            } else {
                return 'integer';  // Es un número entero regular
            }
        } else {
            return 'float';  // Si es un número con decimales, lo tratamos como Float
        }
    }
    return 'string'; // Por defecto, tratamos todo lo demás como cadena de texto
}

// Obtenemos los parámetros de la URL con la función que vimos en clase
function getParams() {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    const params = {};
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
}

// Carga los datos de la API y así obtenemos la estructura de datos
async function loadData() {
    const params = getParams();
    const url = `${params.baseUrl}${params.getEndpoint}`;
 
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
            dataStructure = data[0]; // Guardamos la estructura del primer objeto
        }

        displayData(data);
        generateInsertForm();
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

// Muestra los datos en la tabla
function displayData(data) {
    const table = document.getElementById("dataTable");
    table.querySelector("THEAD").innerHTML="";
    table.querySelector("TBODY").innerHTML="";

    // Generamos los encabezados de tabla

    const headers = Object.keys(dataStructure);
    const headerRow = document.createElement("TR");
    headers.forEach(header => {
        const th = document.createElement("TH");
        th.textContent = header;
        headerRow.appendChild(th);
    });

    const actionsHeader = document.createElement("TH");
    actionsHeader.textContent = "Acciones";
    headerRow.appendChild(actionsHeader);
    table.querySelector("THEAD").appendChild(headerRow);
    
    // Si no hay datos, mostrar mensaje
    if (data.length === 0) {
        const row = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = headers.length + 1;  // Para cubrir todas las columnas (incluyendo "Acciones")
        td.textContent = "No se encontraron datos";
        row.appendChild(td);
        table.querySelector("TBODY").appendChild(row);
        return;  // Detener la ejecución de la función si no hay datos
    }

    // Generamos las filas de datos

    data.forEach(item => {
        const row = document.createElement("TR");

        headers.forEach(key => {
            const td = document.createElement("TD");
            td.textContent = item[key];
            row.appendChild(td);
        });

        const actionsTd = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.onclick = () => openEditForm(item);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = () => deleteItem(item);

        actionsTd.appendChild(editButton);
        actionsTd.appendChild(deleteButton);
        row.appendChild(actionsTd);

        table.querySelector("TBODY").appendChild(row);
    });
}

// Genera el formulario de inserción dinámico
function generateInsertForm() {
    const formContainer = document.getElementById("newProductData");
    formContainer.innerHTML = '';
    const form = generateForm({}, 'insert');
    formContainer.appendChild(form);
}

// Genera un formulario dinámico para inserción o edición
function generateForm(data = {}, mode) {
    const form = document.createElement("form");
    form.id = mode === 'insert' ? 'insertForm' : 'editForm';
    
    Object.keys(dataStructure).forEach(key => {
        const label = document.createElement("LABEL");
        label.textContent = key;
        
        const input = document.createElement("INPUT");
        input.type = typeof data[key] === 'number' ? 'number' : 'text';
        input.step = 'any';  // Permite ingresar números decimales
        input.name = key;
        input.value = data[key] || ''; // Rellena el valor para edición
        form.appendChild(label);
        form.appendChild(input);
        
    });

    const submitButton = document.createElement("BUTTON");

    submitButton.textContent = mode === 'insert' ? "Agregar Producto" : "Guardar Cambios";
    form.appendChild(submitButton);

    form.onsubmit = async function(event) {
        event.preventDefault();
        mode === 'insert' ? addItem(form) : updateItem(form);
    };

    return form;
}

// Abre el formulario de edición con valores preexistentes
function openEditForm(item) {
    const formContainer = document.getElementById("editFormContainer");
    formContainer.style.display = 'block'; // Muestra el formulario de edición
    formContainer.querySelector("#editFormWrapper").innerHTML = ''; // Limpia el contenedor
    const form = generateForm(item, 'edit');
    formContainer.querySelector("#editFormWrapper").appendChild(form);
}

// Agrega un nuevo producto
async function addItem(form) {
    const params = getParams();
    const url = `${params.baseUrl}${params.insertEndpoint}`;
    const newData = {};

    new FormData(form).forEach((value, key) => {
        // Si el campo es un número y no está vacío, lo convertimos al tipo correcto
        if (value && !isNaN(value)) {
            const fieldType = inferType(dataStructure[key]);

            if (fieldType === 'long') {
                newData[key] = BigInt(value); // Convertir a Long (BigInt en JS)
            } else if (fieldType === 'float') {
                newData[key] = parseFloat(value); // Asegurarnos de enviar como Float
            } else if (fieldType === 'integer') {
                newData[key] = parseInt(value, 10); // Convertir a Integer
            }
        } else {
            newData[key] = value; // Si no es un número, lo tratamos como string
        }
    });

    try {
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData)
        });
        loadData(); // Recargar los datos después de la inserción
    } catch (error) {
        console.error("Error al agregar el producto:", error);
    }
}

// Actualiza solo los campos modificados en el producto
async function updateItem(form) {
    
    const updatedData = {}; 

    new FormData(form).forEach((value, key) => {
        // Si el campo es un número y no está vacío, lo convertimos al tipo correcto
        if (value && !isNaN(value)) {
            const fieldType = inferType(dataStructure[key]);

            if (fieldType === 'long') {
                updatedData[key] = BigInt(value); // Convertir a Long (BigInt en JS)
            } else if (fieldType === 'float') {
                updatedData[key] = parseFloat(value); // Asegurarnos de enviar como Float
            } else if (fieldType === 'integer') {
                updatedData[key] = parseInt(value, 10); // Convertir a Integer
            }
        } else {
            updatedData[key] = value; // Si no es un número, lo tratamos como string
        }
    })
    
    let id;
    let keyName;

     // Recorrer updatedData para encontrar la clave que contenga "id" y sea un número
     Object.entries(updatedData).forEach(([key, value]) => {
        if (key.toLowerCase().includes("id") && (typeof value === 'number' || typeof value === 'bigint')) {
            id = value;
            keyName = key;

        }
    });

    // Validar si el id fue encontrado
    if (id === undefined) {
        console.error("No se encontró un ID en los datos proporcionados.");
        return;
    }

    const params = getParams();
    const url = `${params.baseUrl}${params.editEndpoint.replace("{"+keyName+"}", id)}`;
    console.log("Update URL:", url);

    try {
        await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });
        loadData(); // Recargar los datos después de la edición
        document.getElementById("editFormContainer").style.display = "none"; // Oculta el formulario de edición
    } catch (error) {
        console.error("Error al editar el producto:", error);
    }
}


// Elimina un producto
async function deleteItem(item) {
    
    let id;
    let keyName;

     // Recorrer item para encontrar la clave que contenga "id" y sea un número
     Object.entries(item).forEach(([key, value]) => {
        if (key.toLowerCase().includes("id") && (typeof value === 'number' || typeof value === 'bigint')) {
            id = value;
            keyName = key;

        }
    });

    // Validar si el id fue encontrado
    if (id === undefined) {
        console.error("No se encontró un ID en los datos proporcionados.");
        return;
    }

    const params = getParams();
    const url = `${params.baseUrl}${params.deleteEndpoint.replace("{"+keyName+"}", id)}`;
    console.log("Update URL:", url);

    try {
        await fetch(url, {
            method: "DELETE"});
            loadData(); // Recargar los datos después de la eliminación
    } catch (error) {
        console.error("Error al eliminar el elemento:", error);
    }

}

// Cargar datos al iniciar la aplicación
loadData();

