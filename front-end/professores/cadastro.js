let btnCadastrar = document.getElementById("btn-cadastrar")

btnCadastrar.addEventListener("click", () => {

      const professor = {
            matricula: document.getElementById("matricula").value,
            nome: document.getElementById("nome").value,
            sobrenome: document.getElementById("sobrenome").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value
      }

      fetch(`http://localhost:8081/professor`, {
            method: "POST",
            headers: {
                  "Content-Type": "application/json"
            },
            body: JSON.stringify(professor)
      })

      .then(response => response.json())
      .then(data => {
            // let status = document.getElementById("status-cadastro")
            console.log("Professor cadastrado com sucesso:", data);
            // status.innerHTML = `<p> Aluno cadastrado com sucesso! </p>`
            alert("Professor cadastrado com sucesso!")
      })
      .catch(error => {
            console.error("Erro ao cadastrar professor:", error);
      });

})