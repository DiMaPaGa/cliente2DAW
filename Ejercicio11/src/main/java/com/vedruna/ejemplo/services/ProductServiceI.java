package com.vedruna.ejemplo.services;

import java.util.List;

import com.vedruna.ejemplo.persistance.models.Product;



public interface ProductServiceI {
    List<Product> showAllProducts();
    Product showProductByProductName(String productName);
    List<Product> showProductByProductPrice(Float productPrice);
    void saveProduct(Product product);
    void updateProduct(Long productId,Product product);
    void deleteProduct(Long productId);
    
}