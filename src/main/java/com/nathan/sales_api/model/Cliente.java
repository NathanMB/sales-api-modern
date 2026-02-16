package com.nathan.sales_api.model;

import jakarta.persistence.*; // JPA moderno usa Jakarta, não Javax
import lombok.Data;

import java.io.Serializable;

@Entity // Diz ao Spring que isso é uma tabela
@Table(name = "tb_clientes")
@Data
public class Cliente implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment (Serial do Postgres)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(unique = true)
    private String email;

    // Construtor vazio (obrigatório pro JPA)
    public Cliente() {}

    // Construtor cheio
    public Cliente(String nome, String email) {
        this.nome = nome;
        this.email = email;
    }

}