package com.vedruna.ejemplo.persistance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vedruna.ejemplo.persistance.models.Product;

import java.util.List; 

@Repository
public interface ProductRepositoryI extends JpaRepository<Product, Long>{
    //https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html
    Product findByProductName(String productName);
    List<Product> findByProductPrice(Float productPrice);
    void deleteByProductId(Long productId);
}
