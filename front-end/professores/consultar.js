let btnExcluir = document.getElementById("btn-excluir")
let btnAtualizar = document.getElementById("btn-atualizar")

document.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	const codigo = urlParams.get("codProfessor");

	if (codigo) {
		document.getElementById("codigo").value = codigo;
		fetch(`http://localhost:8081/professor/${codigo}`)
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
	let codProfessor = Number(document.getElementById("codigo").value)

	
	console.log("Codigo do profesosr: " + codProfessor)

	if (!confirm("Tem certeza que deseja excluir este professor?")) {
		return;
	}

	fetch(`http://localhost:8081/professor/${codProfessor}`, {
		method: "DELETE"
	})
	.then(response => {
		if (response.ok) {
			alert("Professor excluído com sucesso!");
			window.location.href = "/professor/professor.html";
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

	const professor = {
		codProfessor: document.getElementById("codigo").value,
            matricula: document.getElementById("matricula").value,
            nome: document.getElementById("nome").value,
            sobrenome: document.getElementById("sobrenome").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value
      }

	fetch(`http://localhost:8081/professor/${codigo}`, {
            method: "PUT",
            headers: {
                  "Content-Type": "application/json"
            },
            body: JSON.stringify(professor)
      })
	.then(response => response.json())
      .then(data => {
            console.log("Professor atualizado com sucesso:", data);
            alert("Professor atualizado com sucesso!")
      })
      .catch(error => {
            console.error("Erro ao atualizar professor:", error);
      });
})