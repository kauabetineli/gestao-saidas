package br.senai.sc.app.repository;

import br.senai.sc.app.entity.Aluno;
import br.senai.sc.app.entity.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
}
