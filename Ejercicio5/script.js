document.querySelector('#btnRojo').addEventListener('click', function() {
    document.body.style.backgroundColor = 'red';
    document.body.style.color = 'orange';
    document.querySelector('H1').textContent = 'Tema Rojo';
});

document.querySelector('#btnAzul').addEventListener('click', function() {
    document.body.style.backgroundColor = 'blue';
    document.body.style.color = 'lightblue';
    document.querySelector('H1').textContent = 'Tema Azul';
});

document.querySelector('#btnVerde').addEventListener('click', function() {
    document.body.style.backgroundColor = 'green';
    document.body.style.color = 'lightgreen';
    document.querySelector('H1').textContent = 'Tema Verde';
});

document.querySelector('#btnReset').addEventListener('click', function() {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    document.querySelector('H1').textContent = 'Cambia el tema de la página';
});
