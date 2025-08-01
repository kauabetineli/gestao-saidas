let btnExcluir = document.getElementById("btn-excluir")
let btnAtualizar = document.getElementById("btn-atualizar")

document.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	const codigo = urlParams.get("codAluno");

	if (codigo) {
		document.getElementById("codigo").value = codigo;
		fetch(`http://localhost:8081/aluno/${codigo}`)
		.then(response => response.json())
		.then(data => {
			document.getElementById("matricula").value = data.matricula
			document.getElementById("nome").value = data.nome
			document.getElementById("sobrenome").value = data.sobrenome
			document.getElementById("telefone").value = data.telefone
			document.getElementById("email").value = data.email
		})
	}
});

btnExcluir.addEventListener("click", () => {
	let codAluno = Number(document.getElementById("codigo").value)

	
	console.log("Codigo do aluno: " + codAluno)

	if (!confirm("Tem certeza que deseja excluir este aluno?")) {
		return;
	}

	fetch(`http://localhost:8081/aluno/${codAluno}`, {
		method: "DELETE"
	})
	.then(response => {
		if (response.ok) {
			alert("Aluno excluído com sucesso!");
			window.location.href = "/alunos/alunos.html";
		} else {
			alert("Erro ao excluir aluno.");
		}
	})
	.catch(error => {
		console.error("Erro:", error);
		alert("Erro ao excluir aluno.");
	});
})

btnAtualizar.addEventListener("click", () => {
	let codigo = document.getElementById("codigo").value

	const aluno = {
		codAluno: document.getElementById("codigo").value,
            matricula: document.getElementById("matricula").value,
            nome: document.getElementById("nome").value,
            sobrenome: document.getElementById("sobrenome").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value
      }

	fetch(`http://localhost:8081/aluno/${codigo}`, {
            method: "PUT",
            headers: {
                  "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
      })
	.then(response => response.json())
      .then(data => {
            console.log("Aluno atualizado com sucesso:", data);
            alert("Aluno atualizado com sucesso!")
      })
      .catch(error => {
            console.error("Erro ao atualizar aluno:", error);
      });
})