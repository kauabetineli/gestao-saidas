let btnCadastrar = document.getElementById("btn-cadastrar")

btnCadastrar.addEventListener("click", () => {

      const aluno = {
            matricula: document.getElementById("matricula").value,
            nome: document.getElementById("nome").value,
            sobrenome: document.getElementById("sobrenome").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value
      }

      fetch(`http://localhost:8081/aluno`, {
            method: "POST",
            headers: {
                  "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
      })
      .then(response => response.json())
      .then(data => {
            console.log("Aluno cadastrado com sucesso:", data);
      })
      .catch(error => {
            console.error("Erro ao cadastrar aluno:", error);
      });

})