document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector("#product-list");
    const productForm = document.querySelector("#product-form");
    const productNameInput = document.querySelector("#productName");
    const productPriceInput = document.querySelector("#productPrice");

    // Función para cargar todos los productos al abrir la página
    function fetchProducts() {
        fetch("http://localhost:8080/api/v1/products")
            .then(response => response.json())
            .then(data => renderProducts(data))
            .catch(error => console.error("Error al cargar productos:", error));
    }

    // Función para renderizar la lista de productos
    function renderProducts(products) {
        productList.innerHTML = ""; // Limpiamos la tabla antes de renderizar
        products.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.productId}</td>
                <td>${product.productName}</td>
                <td>${product.productPrice}</td>
                <td class="align-middle text-center">
                    <div class="flex justify-center items-center">
                        <button onclick="deleteProduct(${product.productId})" class="bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center hover:bg-red-600 transition duration-300">X</button>
                    </div>
                </td>
            `;
            productList.appendChild(row);
        });
    }

    // Función para eliminar un producto
    window.deleteProduct = function(productId) {
        fetch(`http://localhost:8080/api/v1/products/delete/${productId}`, {
            method: "DELETE",
        })
        .then(response => {
            if (response.ok) {
                console.log("Producto eliminado");
                fetchProducts(); // Recargar la lista de productos
            } else {
                console.error("Error al eliminar producto");
            }
        })
        .catch(error => console.error("Error al eliminar producto:", error));
    };

    // Función para añadir un nuevo producto
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const productName = productNameInput.value;
        const productPrice = parseFloat(productPriceInput.value);

        if (!productName || isNaN(productPrice)|| productPrice <= 0) {
            alert("Completa todos los campos correctamente.");
            return;
        }

        const newProduct = { productName, productPrice };

        fetch("http://localhost:8080/api/v1/products/insert", {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log("Producto añadido:", data);
            fetchProducts(); // Recargar la lista de productos
            productForm.reset(); // Limpiar el formulario
        })
        .catch(error => console.error("Error al añadir producto:", error));
    });

    // Cargar los productos al cargar la página
    fetchProducts();
});
