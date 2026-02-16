# Sales API Modern 🚀

Sistema de gestão de vendas e emissão de comprovantes fiscais.
Projeto desenvolvido para modernizar um sistema legado, migrando de arquitetura monolítica (JBoss/JSP) para microsserviços com **Spring Boot 4** e Containerização.

## 🛠 Tecnologias Utilizadas

* **Java 25** (LTS)
* **Spring Boot 4** (Web, Data JPA)
* **Banco de Dados:** PostgreSQL 15
* **Documentação:** Swagger (OpenAPI 3.0)
* **Relatórios:** JasperReports (Integração PDF)

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
* Docker e Docker Compose instalados.
* Java 25.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/sales-api.git](https://github.com/seu-usuario/sales-api.git)
    cd sales-api
    ```

2.  **Suba o Banco de Dados (Docker):**
    Não é necessário instalar o Postgres manualmente. Apenas rode:
    ```bash
    docker-compose up -d
    ```

3.  **Execute a Aplicação:**
    ```bash
    ./mvnw spring-boot:run
    ```

4.  **Acesse:**
    * **Frontend:** http://localhost:8080/menu.html
    * **Documentação (Swagger):** http://localhost:8080/swagger-ui.html

## 📚 Documentação da API

A API segue o padrão RESTful. Abaixo alguns exemplos de endpoints:

| Método | Endpoint         | Descrição                  |
| :---   | :---             | :---                       |
| GET    | `/api/clientes`  | Lista todos os clientes    |
| POST   | `/api/clientes`  | Cria um novo cliente       |
| GET    | `/api/vendas`    | Lista vendas realizadas    |

## 📝 Autor

**Nathan Matos**
* [LinkedIn]
* Desenvolvedor Java Fullstack focado em modernização de sistemas legados.
