package br.senai.sc.app.controller;

import br.senai.sc.app.entity.Aluno;
import br.senai.sc.app.service.AlunoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/alunos")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AlunoController {

    private final AlunoService service;

    @PostMapping
    public ResponseEntity<Aluno> cadastrar(@RequestBody Aluno aluno){
        try {
            Aluno novoAluno = service.cadastrar(aluno);
            return ResponseEntity.ok(novoAluno);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/lote")
    public ResponseEntity<List<Aluno>> cadastrarLote(@RequestBody List<Aluno> alunos){
        try {
            List<Aluno> novosAlunos = service.cadastrarLote(alunos);
            return ResponseEntity.ok(novosAlunos);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Aluno> buscar(@PathVariable Long id){
        try {
            Optional<Aluno> alunoBusca = service.buscarPorId(id);
            if(alunoBusca.isEmpty()) throw new RuntimeException("Aluno não existe");
            Aluno aluno = alunoBusca.get();
            return ResponseEntity.ok(aluno);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Aluno>> listar(){
        try {
            List<Aluno> listaAlunos = service.listar();
            return ResponseEntity.ok(listaAlunos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Aluno>> listarPorNome(@RequestParam String nome){
        try {
            List<Aluno> listaAlunosFiltro = service.listarPorNome(nome);
            return ResponseEntity.ok(listaAlunosFiltro);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> apagar(@PathVariable Long id) {
        try {
            service.apagar(id);
            return ResponseEntity.ok("Aluno deletado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

}
