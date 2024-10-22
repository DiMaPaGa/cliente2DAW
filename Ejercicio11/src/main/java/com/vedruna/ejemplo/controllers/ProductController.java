package com.vedruna.ejemplo.controllers;

import com.vedruna.ejemplo.exceptions.ResourceNotFoundException;
import com.vedruna.ejemplo.persistance.models.Product;
import com.vedruna.ejemplo.services.ProductServiceI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private ProductServiceI productMngmnt;

    // Obtener todos los productos
    @GetMapping
    public List<Product> getAllProducts() {
        return productMngmnt.showAllProducts();
    }

    // Obtener producto por nombre
    @GetMapping("/name/{productName}")
    public Product showProductByProductName(@PathVariable String productName) {
        return productMngmnt.showProductByProductName(productName);
    }

    // Obtener productos por precio
    @GetMapping("/price/{productPrice}")
    public List<Product> showProductByProductPrice(@PathVariable Float productPrice) {
        return productMngmnt.showProductByProductPrice(productPrice);
    }

    // Insertar un nuevo producto
    @PostMapping("/insert")
    public Product postProduct(@RequestBody Product product) {
        productMngmnt.saveProduct(product);
        return product; // Devolvemos el producto insertado
    }

    // Editar un producto existente
    @PutMapping("/edit/{productId}")
    public Product editProduct(@PathVariable Long productId, @RequestBody Product product) {
        try {
            productMngmnt.updateProduct(productId, product);
            return product; // Devolvemos el producto editado
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException("Producto no encontrado: " + productId);
        }
    }

    // Eliminar un producto
    @DeleteMapping("/delete/{productId}")
    public String deleteProduct(@PathVariable Long productId) {
        productMngmnt.deleteProduct(productId);
        return "Producto eliminado"; // Confirmación de eliminación
    }
}

