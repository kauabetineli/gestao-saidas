package com.system.ControleSaida.repository;

import com.system.ControleSaida.model.Saida;
import com.system.ControleSaida.util.EstatisticaAlunoLocal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SaidaRepository extends JpaRepository<Saida, Long> {

    List<Saida> findByStatusIsNotAndStatusIsNotOrderByStatusAscDataSolicitacaoAsc(String status1, String status2);
    List<Saida> findByStatusIsNotAndStatusIsNotOrderByDataSolicitacaoDesc(String status1, String status2);

    @Query("SELECT s.nomeAluno as nomeAluno, s.localDestino as localDestino, COUNT(s) as quantidade " +
        "FROM Saida s " +
        "GROUP BY s.nomeAluno, s.localDestino")
    List<EstatisticaAlunoLocal> contarSaidasPorAlunoELocal();

//    List<Saida> findByStatusIsNotAndStatusIsNotOrderByStatusDataSolicitacao(String status, String status1);

//    @Query("SELECT s FROM Saida s ORDER BY CASE WHEN s.status = 'PERMITIDO' THEN 0 ELSE 1 END, s.dataSolicitacao WHERE s.status != 'NEGADO' AND s.status ")
//    List<Saida> listarPrioridadePermitido();

}
