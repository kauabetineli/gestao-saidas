package br.senai.sc.app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "alunos")
@Data
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codAluno;

    private String nome;

    private String sobrenome;

    private Integer matricula;

    private String telefone;

    private String email;
}
