package br.senai.sc.app.repository;

import br.senai.sc.app.entity.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    List<Aluno> findAllByOrderByNomeAsc();

    List<Aluno> findAllByNomeContainingIgnoreCaseOrSobrenomeContainingIgnoreCaseOrderByNomeAsc(String nome, String sobrenome);



}
