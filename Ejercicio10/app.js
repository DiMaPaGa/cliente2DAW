
// Claves de la API de Marvel
const pubkey = 'f5baa28a3e29f7c76307cb1d688c2230';  
const pvtkey = 'ca02ae116f678439000a50afde5c1b0087b4126d'; 

// Función para generar el hash necesario para la autenticación
const generateHash = () => {
    const ts = Date.now();// Genera un timestamp para la autenticación
    const hash = CryptoJS.MD5(ts + pvtkey + pubkey).toString(); // Crea el hash MD5 usando el timestamp, private key y public key (lo que añadire a la petición)
    return { ts, hash };//Devuelve el objeto "generateHash" con el timestamp y el hash integrado.
};

// Petición con fetch normal

document.getElementById('fetch-characters').addEventListener('click', () => {
    const { ts, hash } = generateHash(); //Se llama a la función para generar el hash y el timestamp
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${pubkey}&hash=${hash}&nameStartsWith=Spi&orderBy=name&limit=12`; // Url de la petición: 12 personajes cuyo nombre comience con "Spi" y ordenados por nombre.

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data); //Muestra los datos en la consola y por aquí busqué lo que quería mostrar en las cards
            displayCards(data.data.results, 'personaje'); // Muestra las tarjetas de personajes,tomando los datos de data.results y usando el tipo "personaje"
        })
        .catch(error => {
            console.error('Error:', error); // Muestra el error en caso de que suceda
        });
});

// ---- Petición usando async/await ----
document.getElementById('fetch-comics').addEventListener('click', async () => {
    const { ts, hash } = generateHash(); // Se llama a la función para generar el hash y el timestamp
    const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${pubkey}&hash=${hash}&titleStartsWith=Scar&orderBy=title&limit=12`; // Url de la petición: 12 Comics cuyo nombre comience con "Scar" y ordenados por nombre.

    try {
        const response = await fetch(url); // Espera a que la respuesta del fetch sea completada
        const data = await response.json(); // Convierte la respuesta a JSON
        console.log(data); //Muestra los datos en la consola y por aquí busqué lo que quería mostrar en las cards
        displayCards(data.data.results, 'comic'); // Muestra las tarjetas de cómics, tomando los datos de data.results y usando el tipo "comic"
    } catch (error) {
        console.error('Error fetching comics:', error); // Muestra el error en caso de que suceda
    }
});

// Función para mostrar las tarjetas (cards)
function displayCards(items, type) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de mostrar las nuevas cards

    items.forEach(item => {
        const card = document.createElement('DIV');
        card.classList.add('card');

        const title = type === 'personaje' ? item.name : item.title; // Si es personaje, usa "name", si es cómic, usa "title".
        const imageUrl = `${item.thumbnail.path}.${item.thumbnail.extension}`;  // URL de la imagen (combina el path y la extensión)para que se muestre.

        card.innerHTML = `
            <img src="${imageUrl}" alt="${title}">
            <h3>${title}</h3>
        `;

        container.appendChild(card);
    });
}
