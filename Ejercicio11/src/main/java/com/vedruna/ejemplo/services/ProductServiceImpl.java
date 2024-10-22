package com.vedruna.ejemplo.services;

import com.vedruna.ejemplo.exceptions.ResourceNotFoundException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vedruna.ejemplo.persistance.models.Product;
import com.vedruna.ejemplo.persistance.repository.ProductRepositoryI;

@Service
public class ProductServiceImpl implements ProductServiceI {
    
    @Autowired
    ProductRepositoryI productRepo;

    @Override
    public List<Product> showAllProducts() {
        return productRepo.findAll();
    }

    @Override
    public Product showProductByProductName(String productName) {
        return productRepo.findByProductName(productName);
    }

    @Override
    public List<Product> showProductByProductPrice(Float productPrice) {
        return productRepo.findByProductPrice(productPrice);
    }

    @Override
    public void saveProduct(Product product) {
        productRepo.save(product);
        
    }

    @Override
    public void updateProduct(Long productId,Product product) {
        // Integro lógica para evitar que salga null en los casos en los que no se modifiquen todos los campos
        // Busco el producto actual en la base de datos
        Product existProduct = productRepo.findById(productId)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        
         // Solo actualiza el nombre si no es nulo
        if (product.getProductName() != null) {
            existProduct.setProductName(product.getProductName());
        }

        // Solo actualiza el precio si no es nulo
        if (product.getProductPrice() != null) {
            existProduct.setProductPrice(product.getProductPrice());
        }

        productRepo.save(existProduct);
    }

    @Override
    @Transactional
    public void deleteProduct(Long productId) {
        productRepo.deleteByProductId(productId);
    }
}
