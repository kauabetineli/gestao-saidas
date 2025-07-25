package com.system.ControleSaida.repository;

import com.system.ControleSaida.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    List<Aluno> findByOrderByNome();

    List<Aluno> findByNomeContainingIgnoreCaseOrSobrenomeContainingIgnoreCaseOrderByNomeAsc(String nome, String sobrenome);

}
