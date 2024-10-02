//Dado el array: const array = ["Joaquin", 1, ["Hola","Adios"], true]
const array = ["Joaquin", 1, ["Hola","Adios"], true];

//1) Recorrer el array e insertar dichos valores en el localstorage. 
//El key de cada valor corresponderá a variable + i siendo i el indice en el que se encuentra el array.
for (let i = 0; i < array.length; i++) {
    localStorage.setItem("variable" + i, JSON.stringify(array[i]));
}

//2) Recorrer de 0 a la longitud del array y hacer la peticion de variable + i del localstorage
for (let i = 0; i < array.length; i++) {
    const variable = JSON.parse(localStorage.getItem("variable" + i));
    console.log(variable);
}

//3) Crear un div por cada variable e insertar el valor de dicha variable en el div

let arrayEnDiv = [];
for (let i = 0; i < array.length; i++) {

    const variable = JSON.parse(localStorage.getItem("variable" + i));
    const div = document.createElement("DIV");
    div.textContent = Array.isArray(variable) ? variable.join(", ") : variable; //Permite que si la variable es un array lo convierta en una cadena para poder contatenarlo  
    arrayEnDiv.push(div); //Añadimos el div al array para la siguiente actividad
}
//4) insertar estos divs en el body del html
for (let i = 0; i < arrayEnDiv.length; i++) {
    document.body.appendChild(arrayEnDiv[i]);
}