package com.system.ControleSaida.controller;

import com.system.ControleSaida.dto.SaidaDTO;
import com.system.ControleSaida.model.Aluno;
import com.system.ControleSaida.model.Professor;
import com.system.ControleSaida.model.Saida;
import com.system.ControleSaida.repository.AlunoRepository;
import com.system.ControleSaida.repository.ProfessorRepository;
import com.system.ControleSaida.repository.SaidaRepository;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/saida")
@CrossOrigin("*")
public class SaidaController {

    private final AlunoRepository repositorioAluno;
    private final ProfessorRepository repositorioProfessor;
    private final SaidaRepository repositorioSaida;

    public SaidaController(AlunoRepository repositorioAluno,
                           ProfessorRepository repositorioProfessor,
                           SaidaRepository repositorioSaida) {
        this.repositorioAluno = repositorioAluno;
        this.repositorioProfessor = repositorioProfessor;
        this.repositorioSaida = repositorioSaida;
    }

    @PostMapping
    public ResponseEntity<Saida> cadastrarSaida(@RequestBody SaidaDTO novaSaidaDTO){
        Saida novoSai = new Saida();
        System.out.println("Status é: " + novaSaidaDTO.getStatus());
        novoSai.setDataSolicitacao(LocalDateTime.now());
        System.out.println(novoSai.getDataSolicitacao());
//        novoSai.setDataSolicitacao(novaSaidaDTO.getDataSolicitacao());
//        novoSai.setHoraSaida(null);
//        novoSai.setHoraRetorno(novaSaidaDTO.getHoraRetorno());
        novoSai.setMotivo(novaSaidaDTO.getMotivo());
        novoSai.setLocalDestino(novaSaidaDTO.getLocalDestino());
        novoSai.setStatus("PENDENTE");


//        novoSai.setNomeAluno(novaSaidaDTO.getNomeAluno());
//        novoSai.setNomeProfessor(novaSaidaDTO.getNomeProfessor());


        Aluno aluno_cod = repositorioAluno.findById(novaSaidaDTO.getAluno_cod())
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Aluno não encontrado!" + novaSaidaDTO.getAluno_cod()));

        String alunoNome = aluno_cod.getNome();
        String alunoSobrenome = aluno_cod.getSobrenome();

        String nomeAlunoCompleto = alunoNome + " " + alunoSobrenome;

        novoSai.setNomeAluno(nomeAlunoCompleto);
        System.out.println("Codigo do aluno: " + aluno_cod);

        Professor professor_cod = repositorioProfessor.findById(novaSaidaDTO.getProfessor_cod())
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Entrega não encontrada!" + novaSaidaDTO.getProfessor_cod()));

//        novoSai.setNomeProfessor(professor_cod.getNome());

        String professorNome = professor_cod.getNome();
        String professorSobrenome = professor_cod.getSobrenome();
        String nomeProfessorCompleto = professorNome + " " + professorSobrenome;
        novoSai.setNomeProfessor(nomeProfessorCompleto);
        System.out.println("Codigo do professor: " + professor_cod);

        novoSai.setAluno(aluno_cod);
        novoSai.setProfessor(professor_cod);

        System.out.println(novoSai.toString());

        try{
            Saida dadosSaida = repositorioSaida.save(novoSai);
            System.out.println(dadosSaida.toString());
            return ResponseEntity.ok(dadosSaida);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Saida>> listarSaida(){
        try{
            List<Saida> dadosSaida = repositorioSaida.findAll();
            dadosSaida.forEach(dados -> System.out.println(dados.toString()));
            return ResponseEntity.ok(dadosSaida);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Saida> consultarSaida(@PathVariable Long id){
        try{
            Optional<Saida> saidaOptional = repositorioSaida.findById(id);
            if(saidaOptional.isPresent()){
                Saida saida = saidaOptional.get();
                System.out.println(saida.toString());
                return ResponseEntity.ok(saida);
            }else{
                return ResponseEntity.notFound().build();
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Saida> apagarSaida(@PathVariable Long id){
        try{
            Optional<Saida> saidaOptional = repositorioSaida.findById(id);
            if(saidaOptional.isPresent()){
                repositorioSaida.deleteById(id);
                return ResponseEntity.noContent().build();
            }else{
                return ResponseEntity.notFound().build();
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Saida> atualizarSaida(@PathVariable Long id, @RequestBody SaidaDTO novaSaidaDTO){
        Saida novoSai = new Saida();

        novoSai.setDataSolicitacao(novaSaidaDTO.getDataSolicitacao());
        novoSai.setHoraSaida(novaSaidaDTO.getHoraSaida());
        novoSai.setHoraRetorno(novaSaidaDTO.getHoraRetorno());
        novoSai.setMotivo(novaSaidaDTO.getMotivo());
        novoSai.setLocalDestino(novaSaidaDTO.getLocalDestino());
        novoSai.setStatus(novaSaidaDTO.getStatus());
        novoSai.setNomeAluno(novaSaidaDTO.getNomeAluno());
        novoSai.setNomeProfessor(novaSaidaDTO.getNomeProfessor());

        Aluno aluno_cod = repositorioAluno.findById(novaSaidaDTO.getAluno_cod())
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Aluno não encontrado!" + novaSaidaDTO.getAluno_cod()));

        Professor professor_cod = repositorioProfessor.findById(novaSaidaDTO.getProfessor_cod())
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Entrega não encontrada!" + novaSaidaDTO.getProfessor_cod()));

        novoSai.setAluno(aluno_cod);
        novoSai.setProfessor(professor_cod);

        try{
            Optional<Saida> saidaOptional = repositorioSaida.findById(id);
            if(saidaOptional.isPresent()){
                Saida saida = saidaOptional.get();

                novoSai.setCodSaida(saida.getCodSaida());
                System.out.println(novoSai.toString());

                Saida atualizada = repositorioSaida.save(novoSai);

                return ResponseEntity.ok(atualizada);
            }else{
                return ResponseEntity.notFound().build();
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }







//        try{
//            Saida dadosSaida = repositorioSaida.save(novoSai);
//            System.out.println(dadosSaida.toString());
//            return ResponseEntity.ok(dadosSaida);
//        }catch (Exception e){
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
    }




}
