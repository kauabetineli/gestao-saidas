document.addEventListener("DOMContentLoaded", () => {
      let alunos = document.getElementById("select-alunos");
      let professores = document.getElementById("select-professores");
  
      alunos.innerHTML = `
          <select id="aluno">
              <option value="" disabled selected>Selecione um aluno</option>
          </select>
      `;
  
      fetch('https://api.npoint.io/e406bcc22a2e7636e2e8')
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

      fetch('https://api.npoint.io/f08bccd6086c1ae4a90d')
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