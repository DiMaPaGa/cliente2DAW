//Ejercicio 1.Posicionarnos en el elemento #contenedorCartas:

const contenedorCartas = document.getElementById("contenedorCartas");
console.log(contenedorCartas)

//y mostrarme por consola los siguientes elementos:


//1) Su primer hijo:

const primerHijo = contenedorCartas.querySelector(".carta");
console.log(primerHijo);

//2) Su tercer hijo

const tercerHijo = contenedorCartas.querySelector(".carta:nth-child(3)");
console.log(tercerHijo);


//3) El siguiente hermano del tercer hijo

console.log(tercerHijo.nextElementSibling);

//4) Su último hijo
const ultimoHijo = contenedorCartas.lastElementChild;
console.log(ultimoHijo)

//5) Su padre
const padre= ultimoHijo.parentElement;
console.log(padre);

//6) El padre del padre

const abuelo= padre.parentElement;
console.log(abuelo);

//7) Su hermano anterior

const hermanoAnterior = ultimoHijo.previousElementSibling;
console.log(hermanoAnterior);

//8) Las clases del último hijo

const clasesUltimoHijo = ultimoHijo.classList; 
console.log(clasesUltimoHijo);