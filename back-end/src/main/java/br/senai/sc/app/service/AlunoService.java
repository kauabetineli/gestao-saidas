package br.senai.sc.app.service;

import br.senai.sc.app.entity.Aluno;
import br.senai.sc.app.repository.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlunoService {

    private final AlunoRepository repository;

    public Aluno cadastrar(Aluno aluno){
        return repository.save(aluno);
    }

    public List<Aluno> cadastrarLote(List<Aluno> alunos) {
        return repository.saveAll(alunos);
    }

    public List<Aluno> listar(){
        return repository.findAllByOrderByNomeAsc();
    }

    public Optional<Aluno> buscarPorId(Long id){
        return repository.findById(id);
    }

    public List<Aluno> listarPorNome(String nome){
        return repository.findAllByNomeContainingIgnoreCaseOrSobrenomeContainingIgnoreCaseOrderByNomeAsc(nome, nome);
    }

    public void apagar(Long id) {
        repository.deleteById(id);
    }
}
