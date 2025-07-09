package br.senai.sc.app.repository;

import br.senai.sc.app.entity.Saida;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaidaRepository extends JpaRepository<Saida, Long> {
}
