package br.senai.sc.app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;
import java.time.LocalDate;

@Entity
@Table(name = "saidas")
@Data
public class Saida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codSaida;

    private LocalDate dataSolicitacao;

    private Time horaSaida;

    private Time horaRetorno;

    private String motivo;

    private LocalDestino localDestino;

    private Status status;

    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private Professor professor;

}
