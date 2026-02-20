package com.nathan.sales_api.controller;

import com.nathan.sales_api.model.Cliente;
import com.nathan.sales_api.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController // Define que é uma API REST (retorna JSON)
@RequestMapping("/api/clientes") // Prefixo da URL
@CrossOrigin("*") // Permite que o Frontend acesse sem bloqueio (CORS)
public class ClienteController {

    @Autowired // Injeção de Dependência (Instancia o repo automaticamente)
    private ClienteRepository repository;

    // GET: Listar todos
    @GetMapping
    public List<Cliente> listarTodos() {
        return repository.findAll();
    }

    // POST: Criar novo
    @PostMapping
    public Cliente criar(@RequestBody Cliente cliente) {
        return repository.save(cliente);
    }

    // GET: Listar por nome
    @GetMapping("/{identificador}")
    public Cliente consultaCliente(@PathVariable String identificador) {
        ArrayList<Cliente> clientes = new ArrayList<>();
        clientes.addAll(repository.findAll());
        return clientes.stream()
                .filter(c -> c.getId().toString().equals(identificador) || c.getNome().equalsIgnoreCase(identificador))
                .findFirst()
                .orElse(null);
    }

    // DELETE: Deletar por ID
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}