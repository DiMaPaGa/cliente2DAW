// Almacenando el elemento cuyo id es cardContainer en una variable constante llamada cardContainer, 
const cardContainer = document.getElementById("cardContainer");

// realizar las siguientes acciones:
//1. Eliminar el primer elemento hijo desde el padre.
    cardContainer.removeChild(cardContainer.firstElementChild);

//Otra opcion a considerar para evitar errores cuando trabaje en proyectos más grandes:
/* if (cardContainer.firstElementChild) {
    cardContainer.removeChild(cardContainer.firstElementChild);
}*/

// 2. Eliminar, desde él mismo, el elemento cuya clase es "cards redClass".
const redCard = cardContainer.querySelector(".cards.redClass"); //Hay que poner las clases juntas sin espacio, sino da error.
if (redCard) {
    cardContainer.removeChild(redCard);
}

// 3. Crear un elemento h1 con vuestro nombre.
const nombreElemento = document.createElement("H1");
nombreElemento.textContent = "Diana";

// 4. Crear un elemento enlace con texto "Vedruna" y cuyo href sea la pagina del vedruna.
const enlaceVedruna = document.createElement("A");
enlaceVedruna.textContent = "Vedruna";
enlaceVedruna.href = "https://vedrunasevilla.org/"; 

// 5. Crear un elemento botón cuyo id sea "botonJoker" y su texto sea "boton".
const botonJoker = document.createElement("BUTTON");
botonJoker.id = "botonJoker";
botonJoker.textContent = "boton";

// 6. Crear un elemento div cuya clase sea "cards greenClass".
const nuevoDiv = document.createElement("DIV");
nuevoDiv.classList.add("cards", "greenClass");

// 7. Añadir al elemento div creado anteriormente los h1, enlace y boton creados anteriormente.
nuevoDiv.appendChild(nombreElemento);
nuevoDiv.appendChild(enlaceVedruna);
nuevoDiv.appendChild(botonJoker);

// 8. Añadir a cardContainer el div del apartado anterior.
cardContainer.appendChild(nuevoDiv);