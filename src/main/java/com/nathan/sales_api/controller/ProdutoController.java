package com.nathan.sales_api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nathan.sales_api.model.Produto;
import com.nathan.sales_api.repository.ProdutoRepository;


@RestController // Define que é uma API REST (retorna JSON)
@RequestMapping("/api/produtos") // Prefixo da URL
@CrossOrigin("*")
public class ProdutoController {
    @Autowired // Injeção de Dependência (Instancia o repo automaticamente)
    private ProdutoRepository repository;

    // GET: Listar todos
    @GetMapping
    public List<Produto> listarTodos() {
        return repository.findAll();
    }

    // POST: Criar novo
    @PostMapping
    public Produto criar(@RequestBody Produto produto) {
        return repository.save(produto);
    }

    // GET: Listar por Identificador (ID ou Descrição)
    @GetMapping("/{identificador}")
    public Produto consultaProduto(@PathVariable String identificador) {
        ArrayList<Produto> produtos = new ArrayList<>();
        produtos.addAll(repository.findAll());
        Produto encontrado = null;

        for (Produto p : produtos) {
            if (p.getId().toString().equals(identificador) || p.getDescricao().equalsIgnoreCase(identificador)) {
                encontrado = p;
            }
        }

        return encontrado;
    }

    // DELETE: Deletar por ID
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
