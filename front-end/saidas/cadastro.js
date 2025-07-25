let btnCadastrar = document.getElementById("btn-cadastrar")

document.addEventListener("DOMContentLoaded", () => {
        let dataAtual = document.getElementById("data")
        dataAtual.valueAsDate = new Date()
        
        let alunos = document.getElementById("select-alunos");
        let professores = document.getElementById("select-professores");
  
      alunos.innerHTML = `
          <select id="aluno">
              <option value="" disabled selected>Selecione um aluno</option>
          </select>
      `;
  
      fetch('http://localhost:8081/aluno')
          .then(response => response.json())
          .then(data => {
                  let selectAluno = document.getElementById("aluno");
                  data.forEach(aluno => {
                  let option = document.createElement("option");
                  option.value = aluno.codAluno;
                  option.textContent = `${aluno.codAluno} - ${aluno.nome} ${aluno.sobrenome}`;
                  selectAluno.appendChild(option);
            });
      })
          .catch(error => {
              console.error("Erro ao carregar alunos:", error);
          });

      professores.innerHTML = `
          <select id="professor">
              <option value="" disabled selected>Selecione um professor</option>
          </select>
      `

      fetch('http://localhost:8081/professor')
          .then(response => response.json())
          .then(data => {
                let selectProfessor = document.getElementById("professor")
                data.forEach(professor => {
                    let option = document.createElement("option")
                    option.value = professor.codProfessor
                    option.textContent = `${professor.codProfessor} - ${professor.nome} ${professor.sobrenome}`
                    selectProfessor.appendChild(option)
                })
          })

  });

btnCadastrar.addEventListener("click", () => {
    // const { DateTime } = require('luxon')
    const alunoSelect = Number(document.getElementById("aluno").value)
    const professorSelect = Number(document.getElementById("professor").value)
    const motivoInput = document.getElementById("motivo").value
    const localDestinoInput = document.getElementById("local").value

    // const localDateTime = DateTime.local().toFormat("yyyy-MM-dd'T'HH:mm:ss");
    // const dataHoraAtual = new Date().toISOString()

    const saida = {
        // dataSolicitacao: dataHoraAtual,
        motivo: motivoInput,
        localDestino: localDestinoInput,
        aluno_cod: alunoSelect,
        professor_cod: professorSelect
    }

    console.log(saida)

    fetch(`http://localhost:8081/saida`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(saida)
    })
    .then(response => {
        if (response.ok) {
            alert("Saída cadastrada com sucesso!");
        } else {
            throw new Error("Erro ao cadastrar saída.");
        }
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao cadastrar a saída.");
    });

})