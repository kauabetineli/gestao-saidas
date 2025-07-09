let btnExcluir = document.getElementById("btn-excluir")

document.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	const codAluno = urlParams.get("codAluno");

	if (codAluno) {
		document.getElementById("codigo").value = codAluno;
		fetch(`http://localhost:8081/aluno/${codAluno}`)
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