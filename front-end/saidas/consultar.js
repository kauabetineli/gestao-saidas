document.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	const codigo = urlParams.get("codSaida");
      console.log("cogido é " + codigo)
	if (codigo) {
		// document.getElementById("codigo").value = codigo;
		fetch(`http://localhost:8081/saida/${codigo}`)
		.then(response => response.json())
		.then(saida => {
                  document.getElementById("codSaida").value = saida.codSaida;
                  document.getElementById("dataSolicitacao").value = new Date(saida.dataSolicitacao).toLocaleString();
                  document.getElementById("horaSaida").value = saida.horaSaida || "N/A";
                  document.getElementById("horaRetorno").value = saida.horaRetorno || "N/A";
                  document.getElementById("motivo").value = saida.motivo;
                  document.getElementById("localDestino").value = saida.localDestino;
                  document.getElementById("status").value = saida.status;
                  document.getElementById("nomeAluno").value = saida.nomeAluno;
                  document.getElementById("nomeProfessor").value = saida.nomeProfessor;
		})
	}
});