package com.nathan.sales_api.repository;

import com.nathan.sales_api.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Pronto! Só de estender JpaRepository, você já tem:
    // .save(), .findAll(), .delete(), .findById() prontos.
    // Sem escrever nenhum SQL.
}