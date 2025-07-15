let btnExcluir = document.getElementById("btn-excluir")
let btnAtualizar = document.getElementById("btn-atualizar")

document.addEventListener("DOMContentLoaded", async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const codigo = urlParams.get("codSaida");
      let selectProfessor, selectAluno;
      console.log("cogido é " + codigo)

      let alunos = document.getElementById("select-alunos");
      let professores = document.getElementById("select-professores");
  
      alunos.innerHTML = `
          <select id="aluno">
              <option value="" disabled selected>Selecione um aluno</option>
          </select>
      `;
  
      await fetch('http://localhost:8081/aluno')
          .then(response => response.json())
          .then(data => {
                  selectAluno = document.getElementById("aluno");
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

      await fetch('http://localhost:8081/professor')
          .then(response => response.json())
          .then(data => {
                selectProfessor = document.getElementById("professor")
                data.forEach(professor => {
                    let option = document.createElement("option")
                    option.value = professor.codProfessor
                    option.textContent = `${professor.codProfessor} - ${professor.nome} ${professor.sobrenome}`
                    selectProfessor.appendChild(option)
                })
                
                
          })

          // ----------------------------------------------------------------------------------------------------------------------------------

	if (codigo) {
		// document.getElementById("codigo").value = codigo;
		fetch(`http://localhost:8081/saida/${codigo}`)
		.then(response => response.json())
		.then(saida => {
                  document.getElementById("codSaida").value = saida.codSaida;
                  document.getElementById("dataSolicitacao").value = new Date(saida.dataSolicitacao).toLocaleString();
                  document.getElementById("horaSaida").value = saida.horaSaida || "";
                  document.getElementById("horaRetorno").value = saida.horaRetorno || "";
                  document.getElementById("motivo").value = saida.motivo;
                  document.getElementById("localDestino").value = saida.localDestino;
                  document.getElementById("status").value = saida.status;
                  selectAluno.value = saida.aluno.codAluno;
                  selectProfessor.value = saida.professor.codProfessor;
                  // document.getElementById("aluno").value = saida.nomeAluno;
                  // document.getElementById("professor").value = saida.nomeProfessor;
		})
	}
});

btnAtualizar.addEventListener("click", () => {

      let selectAluno = document.getElementById("aluno");
      let selectProfessor = document.getElementById("professor");

      let codSaida = Number(document.getElementById("codSaida").value);
      const saidaAtualizada = {
            // dataSolicitacao: document.getElementById("dataSolicitacao").value,
            horaSaida: document.getElementById("horaSaida").value,
            horaRetorno: document.getElementById("horaRetorno").value,
            motivo: document.getElementById("motivo").value,
            localDestino: document.getElementById("localDestino").value,
            status: document.getElementById("status").value,
            // nomeAluno: selectAluno.options[selectAluno.selectedIndex].textContent,
            // nomeProfessor: selectProfessor.options[selectProfessor.selectedIndex].textContent,
            aluno_cod: Number(selectAluno.value),
            professor_cod: Number(selectProfessor.value),
      };

      fetch(`http://localhost:8081/saida/${codSaida}`, {
            method: "PUT",
            headers: {
                  "Content-Type": "application/json"
            },
            body: JSON.stringify(saidaAtualizada)
      })
      .then(response => {
            if (response.ok) {
                  alert("Saída atualizada com sucesso!");
                  window.location.href = "saidas.html";
            } else {
                  alert("Erro ao atualizar a saída. Tente novamente.");
            }
      })
      .catch(error => {
            console.error("Erro ao atualizar a saída:", error);
            alert("Erro ao atualizar a saída. Verifique a conexão com o servidor.");
      });


})

btnExcluir.addEventListener("click", () => {
      
      if(!confirm("A saída será excluida de forma permanente. Não será possível recuperar os dados. Deseja prosseguir?")) {
            return;
      }

      let codSaida = Number(document.getElementById("codSaida").value)
      fetch(`http://localhost:8081/saida/${codSaida}`, {
            method: "DELETE"
      })
      .then(response => {
            if (response.ok) {
                  alert("Saída excluída com sucesso!");
                  window.location.href = "saidas.html";
            } else {
                  alert("Erro ao excluir a saída. Tente novamente.");
            }
      })
      .catch(error => {
            console.error("Erro ao excluir a saída:", error);
            alert("Erro ao excluir a saída. Verifique a conexão com o servidor.");
      });

})