# Sistema de Controle de Saída

Este é um sistema de gerenciamento de saídas de alunos, desenvolvido como trabalho final para o SENAI. O sistema permite o registro, aprovação e acompanhamento de solicitações de saída de alunos, com autorização de professores.

## Descrição do Projeto

O Sistema de Controle de Saída é uma aplicação web desenvolvida com Spring Boot que gerencia solicitações de saída de alunos de uma instituição. O sistema registra informações como:

- Data e hora da solicitação
- Horário de saída e retorno
- Motivo da saída
- Local de destino
- Status da solicitação
- Aluno solicitante
- Professor responsável pela autorização

## Pré-requisitos

Para executar este projeto, você precisará ter instalado:

- Java 21
- Maven 3.6+ 
- MySQL 8.0+
- Git (opcional, para clonar o repositório)

## Configuração do Banco de Dados

1. Crie um banco de dados MySQL chamado `db_cont_saida`:

```sql
CREATE DATABASE db_cont_saida;
```

2. As tabelas serão criadas automaticamente pela aplicação através do Hibernate (spring.jpa.hibernate.ddl-auto=update).

3. Verifique e ajuste as configurações de conexão no arquivo `src/main/resources/application.properties` se necessário:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/db_cont_saida
spring.datasource.username=root
spring.datasource.password=1234
```

## Instalação e Execução

### Clonando o Repositório (opcional)

```bash
git clone <URL_DO_REPOSITÓRIO>
cd senaiTrab/back-end
```

### Compilando e Executando com Maven

1. Compile o projeto:

```bash
mvn clean install
```

2. Execute a aplicação:

```bash
mvn spring-boot:run
```

3. A aplicação estará disponível em: http://localhost:8081

## Tecnologias Utilizadas

- Spring Boot 3.5.3
- Spring Data JPA
- Spring Web
- MySQL
- Maven

## Estrutura do Projeto

- `src/main/java/com/system/ControleSaida/controller` - Controladores REST
- `src/main/java/com/system/ControleSaida/model` - Entidades JPA
- `src/main/java/com/system/ControleSaida/repository` - Repositórios Spring Data
- `src/main/java/com/system/ControleSaida/dto` - Objetos de Transferência de Dados
- `src/main/java/com/system/ControleSaida/util` - Classes utilitárias
- `src/main/resources` - Arquivos de configuração
- `src/UML` - Diagramas UML e modelo do banco de dados
