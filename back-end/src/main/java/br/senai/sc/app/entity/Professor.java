package br.senai.sc.app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "professores")
@Data
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codProfessor;

    private String nome;

    private String sobrenome;

    private Integer matricula;

    private String telefone;

    private String email;
}
