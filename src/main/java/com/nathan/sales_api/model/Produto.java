package com.nathan.sales_api.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.Data;

@Entity // Diz ao Spring que isso é uma tabela
@Table(name = "tb_produtos")
@Data
public class Produto implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment (Serial do Postgres)
    private Long id;

    @Column(nullable = false)
    private String descricao;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal valor;

    @Column(nullable = false)
    private Integer quantidadeEstoque;

    @CreationTimestamp
    @Column(nullable = false)
    private Instant dataCadastro;

    // Construtor vazio (obrigatório pro JPA)
    public Produto() {
    }

    public Produto(String descricao, BigDecimal valor, Integer quantidadeEstoque, Instant dataCadastro) {
        this.descricao = descricao;
        this.valor = valor;
        this.quantidadeEstoque = quantidadeEstoque;
        this.dataCadastro = dataCadastro;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Integer getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public void setQuantidadeEstoque(Integer quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public Instant getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(Instant dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

}
