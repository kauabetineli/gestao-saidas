package com.system.ControleSaida.repository;

import com.system.ControleSaida.model.Aluno;
import com.system.ControleSaida.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {

    List<Professor> findByOrderByNome();

    List<Professor> findByNomeContainingIgnoreCaseOrSobrenomeContainingIgnoreCaseOrderByNomeAsc(String nome, String sobrenome);


}
